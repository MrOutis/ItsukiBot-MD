import fetch from "node-fetch";
let handler = async (m, {text, usedPrefix, command}) => {
if (!global.db.data.chats[m.chat].nsfw) throw `❎ En este grupo no esta permitido el contenido +18`
  if (!text) throw `Que quiere que busque en Xnxx?`;
  try {
    let res = await xnxxsearch(text);
    let json = res.result;
    let cap = ``;
    for (let v of json) {
      cap += `*🍭 Título*: ${v.title}
*📚* : ${v.info}
*⛓* : ${v.link}
`;
      cap += "\n\n╶\n\n";
    }
    m.reply(cap);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
handler.help = ["xnxxsearch"].map((v) => v + " <texto>");
handler.tags = ["nsfw", "search"];
handler.command = /^xnxxsearch|xnxxs$/i;

handler.register = true;

export default handler;

async function xnxxsearch(query) {
  return new Promise((resolve, reject) => {
    const baseurl = "https://www.xnxx.com";
    fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: "get"})
      .then((res) => res.text())
      .then((res) => {
        let $ = cheerio.load(res, {xmlMode: false});
        let title = [];
        let url = [];
        let desc = [];
        let results = [];
        $("div.mozaique").each(function (a, b) {
          $(b)
            .find("div.thumb")
            .each(function (c, d) {
              url.push(baseurl + $(d).find("a").attr("href").replace("/THUMBNUM/", "/"));
            });
        });
        $("div.mozaique").each(function (a, b) {
          $(b)
            .find("div.thumb-under")
            .each(function (c, d) {
              desc.push($(d).find("p.metadata").text());
              $(d)
                .find("a")
                .each(function (e, f) {
                  title.push($(f).attr("title"));
                });
            });
        });
        for (let i = 0; i < title.length; i++) {
          results.push({title: title[i], info: desc[i], link: url[i]});
        }
        resolve({code: 200, status: true, result: results});
      })
      .catch((err) => reject({code: 503, status: false, result: err}));
  });
}