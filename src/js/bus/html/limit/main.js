
function kiss(){};

function main(a, ...args){
	console.log(args)
	kiss(a, ...args)

};


main(1,2,3);