"use strict";

import './style.less';

const QrcodeImg = require('./qrcodeImg');
const Page = require('modules/page/index');
const Input = require('modules/input/index');
const Validator = require('modules/validator/index');
const DialogWidget = require('modules/dialog/widget');

import SearchList from 'modules/searchList/index';

// 组件类
class Qrcode extends React.Component {
	render(){
		let me = this;
		let {props} = me;
		let {pageData} = props;
		return (
			<div className={`qrcode ${props.initPage ? '': 'fn-hide' }`}>
				<div className="qrcode-layout">
					{/* 增加按钮 */}
					<div className="qrcode-add">
						<Input type="button" value="增 加" onClick={me.addQrcode.bind(me, false)} /><br />
						{do{
							if( props.listData.some((val) => val.selected) ){
								<Input type="button" value="批量删除" onClick={Actions(me).deleteListQrcode} className="fn-MT10" />
							}
						}}
					</div>

					{/* 列表 */}
					<table className="qrcode-table" width="100%">
						<thead>
							<tr>
								<td width="30">
									<input type="checkbox" 
										onClick={Actions(me).selectAll} 
										checked={props.allSelect}/>
								</td>
								<td width="90">二维码</td>
								<td width="100">名称</td>
								<td>描述</td>
								<td width="50" className="fn-TAC">操作</td>
							</tr>
						</thead>
						<tbody>
							{props.listData.map((data, key) => {
								return (
									<tr key={key}>
										<td width="30">
											<input type="checkbox"
												checked={data.selected}
												onClick={Actions(me).selectOne.bind(null, data)}
												id={`qrcodeid${data.id}`} />
										</td>
										<td>
											<label htmlFor={`qrcodeid${data.id}`}>
												<QrcodeImg src={data.url} />
											</label>
										</td>
										<td>{data.name}</td>
										<td><a href={data.url} target="_blank">{data.url}</a><br />{data.info}</td>
										<td className="fn-TAC">
											<a href="javascript:;" onClick={me.editQrcode.bind(me, data)}>编辑</a><br />
											<a href="javascript:;" onClick={me.viewQrcode.bind(me, data)}>查看</a><br />
											<a href="javascript:;" onClick={Actions(me).deleteQrcode.bind(null, data)}>删除</a>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
					<SearchList url="/qrcode/get.json" 
						onSuccess={Actions(me).data} number="7" className="fn-MT10" />
				</div>
			</div>
		);
	}
	editQrcode(data){
		let me = this;
		Actions(me).editQrcode(data).then(() => {
			me.addQrcode(true);
		});
	}
	submiFrom(){
		let me = this;
		console.log(me.isEdit);
		Actions(me).submit().then(() => {
			me.dialogExp.destroy();
			if( me.isEdit ){
				Actions('searchList').search();
			}else{
				Actions('searchList').start();
			};
		}, limit.K);
	}
	addQrcode(isEdit){
		let me = this;
		let {props} = me;
		let {originData} = props;
		me.isEdit = !!isEdit;
		me.dialogExp = new DialogWidget({height:'auto', width: 'auto', useEsc: true}, null, 
			<div className="qrcode-dialog">
				<div className="qrcode-dialog-head">
					{originData.id?'编辑':'新增'}二维码
				</div>
				<div className="qrcode-dialog-body">
					<Validator executeSuccess={ me.submiFrom.bind(me) }>
						<table>
							<tbody>
								<tr>
									<td className="fn-VAM">名称</td>
									<td>
										<Input type="text" 
											rule="required,max(10)"
											onChange={Actions(me).change.bind(null, 'name')}
											errMessage="二维码名称必填,长度最大20"
											name="name" 
											focus="focus"
											value={originData.name} 
											placeholder="请输入二维码名称" />
									</td>
								</tr>
								<tr>
									<td className="fn-VAM">地址</td>
									<td>
										<Input type="text" 
											rule="required,max(100)"
											errMessage="二维码地址必填,长度最大200"
											onChange={Actions(me).change.bind(null, 'url')}
											name="url" 
											value={originData.url} 
											placeholder="请输入二维码地址" />
									</td>
								</tr>
								<tr>
									<td className="qrcode-dialog-info">描述</td>
									<td>
										<Input type="textarea" 
											rule="required,max(500)"
											errMessage="二维码描述必填,长度最大1000"
											onChange={Actions(me).change.bind(null, 'info')}
											name="info" 
											value={originData.info} 
											placeholder="请输入二维码描述" />
									</td>
								</tr>
								<tr>
									<td> </td>
									<td>
										<Input type="submit" value="保 存" />
										<Input type="reset" value="重 置" className="fn-ML10" />
									</td>
								</tr>
							</tbody>
						</table>
					</Validator>
				</div>
			</div>
		);
	}
	viewQrcode(){
		let me = this;
	}
	componentDidMount(){
		let me = this;
		Actions('searchList').search();
	}
};

module.exports = Qrcode;

