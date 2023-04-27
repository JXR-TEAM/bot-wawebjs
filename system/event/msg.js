export default async function handlerMessage(ronzz, m) {
    console.log(m)
    var prefix = process.env.prefix;
    try {
        var prf = prefix ? /^[°•π÷×¶∆£¢€¥®=????+✓_=|~!?@#%^&./©^]/gi.test(m.body) ? m.body.match(/^[°•π÷×¶∆£¢€¥®=????+✓_=|~!?@#%^&./©^]/gi)[0] : "" : prefix ?? global.prf;

        const {
            body,
            from,
            hasMedia: isMedia,
            type
        } = m
        let mc = await m.getChat()
        let sender = m.author || m.from
        const [cmd, ...args] = m.body.substring(prf.length).split(/ +/g);
        const isOwner = [ronzz.info.wid._serialized, process.env.owner].map(v => v.replace(/[^0-9]/g, '') + '@c.us').includes(sender)
        const text = args.join(" ")
        const quoted = m.hasQuotedMsg ? await m.getQuotedMessage() : m
        const mime = (quoted._data || quoted).mimetype || ""
        const isGroup = from.endsWith("@g.us")
        const metadata = await m.getChat()
        const groupName = isGroup ? metadata.groupMetadata.name : ""
        const participants = isGroup ? metadata.groupMetadata.participants : []
        const groupAdmins = isGroup ? participants.filter(v => v.isAdmin && !v.isSuperAdmin).map(v => v.id._serialized) : []
        const isBotAdmin = isGroup ? groupAdmins.includes(ronzz.info.wid._serialized) : false
        const isAdmin = isGroup ? groupAdmins.includes(sender) : false

        if (!m) return
        if (!process.env.public && !m.fromMe) return
        if (m.id.id.startsWith("3EB") && m.id.id.length == 20) return
        if (!m.body.toLowerCase().startsWith(prf)) return;
       // console.log("cmd1 ", ronzz.cmd)
        const command = ronzz.cmd.get(cmd.toLowerCase()) || ronzz.cmd.find(c => c.aliases?.includes(cmd.toLowerCase()));

       // console.log("cmd ", command)
        if (!command) return;
        let cmdOpt = {
            desc: "Ronzz YT",
            mc,
            body,
            from,
            isMedia,
            type,
            sender,
            prf,
            cmd,
            args,
            isOwner,
            text,
            quoted,
            mime,
            isGroup,
            metadata,
            groupName,
            participants,
            groupAdmins,
            isBotAdmin,
            isAdmin
        }

        if (command.default.isQ && !text) return m.reply(command.default.qt)
        if (command.default.isOwner && !isOwner) return m.reply("Command ini hanya dapat digunakan oleh owner bot")
        if (command.default.isGc && !isGroup) return m.reply("Command ini hanya bisa digunakan di grup")
        if (command.default.isBotAdm && !isBotAdmin) return m.reply("Bot Harus menjadi admin")
        await command.default.run(ronzz, m, cmdOpt);

    } catch (e) {
        console.error(e)
    }
}
