"use strict";

import './style.less';

const Page = require('modules/page/index');
const Input = require('modules/input/index');
const DialogWidget = require('modules/dialog/widget');
const Validator = require('modules/validator/index');

// 组件类
class Qrcode extends React.Component {
	render(){
		let me = this;
		let {props} = me;
		return (
			<div className="qrcode">
				<div className="qrcode-layout">
					{/* 增加按钮 */}
					<div className="qrcode-add">
						<Input type="button" value="增 加" onClick={me.addQrcode.bind(me)} />
					</div>
					{/* 列表 */}
					<table className="qrcode-table" width="100%">
						<thead>
							<tr>
								<td width="80" className="fn-TAC">二维码</td>
								<td width="100" >名称</td>
								<td>描述</td>
								<td width="50" className="fn-TAC">操作</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div className="qrcode-img"></div>
								</td>
								<td>这是文字</td>
								<td>
									描述<br />描述
								</td>
								<td className="fn-TAC">
									<a href="javascript:;">编辑</a><br />
									<a href="javascript:;">查看</a><br />
									<a href="javascript:;">删除</a>
								</td>
							</tr>
						</tbody>
					</table>
					{/* 分页 */}
					<Page className="qrcode-page fn-MT10" />
				</div>
			</div>
		);
	}
	addQrcode(){
		let me = this;
		let {props} = me;
		let {originData} = props;
		new DialogWidget({height:'auto', width: 'auto'}, null, 
			<div className="qrcode-dialog">
				<Validator executeSuccess={function(){console.log('success')}}>
					<table>
						<tbody>
							<tr>
								<td className="fn-VAM">名称</td>
								<td>
									<Input type="text" 
										rule="required"
										errMessage="名称必填"
										name="name" 
										value={originData.name} 
										placeholder="请输入名称" />
								</td>
							</tr>
							<tr>
								<td className="fn-VAM">地址</td>
								<td><Input type="text" name="url" value="" placeholder="请输入地址" /></td>
							</tr>
							<tr>
								<td className="qrcode-dialog-info">描述</td>
								<td>
									<Input type="textarea" name="info" value="" placeholder="请输入描述" />
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
		);
	}
};

module.exports = Qrcode;

