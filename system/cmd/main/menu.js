import wweb from 'wwebjs'
const {
    Buttons
} = wweb

export default {
    cmd: /^(menu|help|?)$/i,
    help: "menu",
    desc: 'menampilkan list menu',
    tags: 'main',
    run: async (ronzz, m, {
        mc,
        text
    }) => {
        const con = await m.getContact()
        const tg = ['main', 'downloader', 'tools', 'owner']
        const res = Array.from(ronzz.cmd.values())
            .filter(ce => tg.some(tag => ce.default.tags === tag));
        const ok = {};
        res.forEach((item) => {
            if (!(item.default.tags in ok)) ok[item.default.tags] = [];
            ok[item.default.tags].push(item.default.help);
        });
        const result = Object.entries(ok)
            .map(([tag, cmd]) => `[ ${tag} ]\n- ${cmd.join('\n- ')}`)
            .join('\n\n');

        let button = new Buttons(`Hai, *@${con.number}* 👋\nbot ini masih dalam tahap pengembangan!!

${result}`, [{
            body: 'OWNER'
        }, {
            body: 'SCRIPT'
        }, ], '', '© wwebjs library', false);
        m.reply(button, false, { mentions: [con] })
    }
}
