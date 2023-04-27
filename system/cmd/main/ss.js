import wwebjs from 'wwebjs'
const { MessageMedia } = wwebjs

export default {
    cmd: /^s(s|swa)$/i,
    help: "ss",
    desc: "Screnshoot whatsapp bot",
    tags: 'main',
    run: async (ronzz, m, { text, args }) => {
        m.reply("⏳ Mohon tunggu sebentar...");
        let media = await ronzz.pupPage.screenshot();
        let base64Media = Buffer.from(media).toString("base64");

        ronzz.sendMessage(m.from, new MessageMedia("image/jpg", base64Media), {
            caption: "BETA WHATSAPP BOT",
            quotedMessageId: m.id._serialized,
        });
    },
};
