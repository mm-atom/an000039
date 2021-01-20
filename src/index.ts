import { verify } from 'jsonwebtoken';
import config from '@mmstudio/config';
import anylogger from 'anylogger';

const logger = anylogger('@mmstudio/an000039');

const session = config.session as {
	secret: string;
	expiresIn: string | number;
};

export default function get_user<T>(token: string) {
	return new Promise<T | null>((res) => {
		verify(token, session.secret, { algorithms: ['HS256'], complete: false }, (err, decoded) => {
			if (err) {
				logger.error('failed verify token:', token, 'resion:', err.message);
				res(null);
			}
			const { exp, iat, ...rest } = decoded as T & { exp: number; iat: number; };
			logger.debug('sccess verify token:', token, 'exp:', exp, 'iat:', iat, 'userinfo:', rest);
			// delete decoded.exp;iat
			res(rest as unknown as T);	// todo we don't need as unknown here, just ignore ts error, this maybe an issue of typescript.
		});
	});
}
