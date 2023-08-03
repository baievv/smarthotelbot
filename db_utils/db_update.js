import { getUserRecordIdbyPhone } from "./db_utils.js";
import { base } from "./dbconnect.js";

const updateUserPhotoByPhone = async (ctx) => {
	const { phone } = ctx.session;
	console.log("User phone - ", phone);
	const recordId = await getUserRecordIdbyPhone(phone);
	console.log("User rec id - ", recordId);
	const document = ctx.message.document;
	const { href: url } = await ctx.telegram.getFileLink(document.file_id);
	console.log("User photo link - ", url);
	base("Users").update(
		[
			{
				id: recordId,
				fields: {
					passport: [{ url }],
				},
			},
		],
		function (err) {
			if (err) {
				console.error(err);
				return;
			}
		}
	);
};

const updateNewUserByPhone = async (phone, userData, role) => {
	const recordId = await getUserRecordIdbyPhone(phone);
	console.log("Updating user|record Id - ", recordId);
	base("Users").update(
		[
			{
				id: recordId,
				fields: {
					tg_id: userData.tg_id,
					tg_chatId: userData.tg_chatId,
					tg_userName: userData.tg_userName,
					tg_firstName: userData.tg_firstName,
					tg_lastName: userData.tg_lastName,
					role: role,
				},
			},
		],
		function (err) {
			if (err) {
				console.error(err);
				return;
			}
		}
	);
};

export { updateNewUserByPhone, updateUserPhotoByPhone };
