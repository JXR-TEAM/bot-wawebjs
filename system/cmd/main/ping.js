import speed from "performance-now";

export default {
    cmd: /^(ping|respon)$/i,
    help: "ping",
    desc: 'testing',
    tags: 'main',
    run: async(ronzz, m, { text }) => {
        let timestamp = speed()
        let latensi = speed() - ini_timestamp
        m.reply(`Kecepatan Respon _${latensi.toFixed(4)} Second_`)
    }
}
