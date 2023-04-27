import axios from "axios";
import wweb from 'wwebjs'
const { MessageMedia } = wweb
import fs from "fs";

export default {
    cmd: /^t(t|tmp4|iktok|iktokmp4)$/i,
    help: "tiktokmp4",
    desc: "tiktok downloader",
    tags: "downloader",
    qt: "masukan urlnya!!",
    run: async (ronzz, m, { mc, text }) => {

        try {
            let name = await func.rand(5);
            m.reply("⏳ Mohon tunggu sebentar...");
            var res = await axios.post("https://ssyoutube.com/api/convert", `url=${text}`);

            let json = res.data;
            let file = await func.downloadFile(`${name}.mp4`, json.url[0].url);

            await func.delay(5000);

            const media = MessageMedia.fromFilePath(`./tmp/${name}.mp4`);
            m.reply(media, false, {
                caption: `*TIKTOK DOWNLOADER*

Title: ${json.meta.title}
Duration: ${json.meta.duration}`,
            });
        } catch {
            m.reply("Maaf terjadi kesalahan");
        }
    },
    isQ: true,
};
