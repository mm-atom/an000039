const test = require('ava');
const { sign } = require('jsonwebtoken');

const { default: a } = require('../dist/index');

test('verify token', async (t) => {
	const userinfo = { id: 'myid', userid: 'myuserid', info: { foo: 'bar' } };
	const token = sign(userinfo, 'Mmstudio123', {
		expiresIn: '30d'
	});
	const ret = await a(token);
	t.deepEqual(userinfo, ret);
});
