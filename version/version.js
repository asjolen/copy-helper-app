const editJsonFile = require("edit-json-file");
let file = editJsonFile(`${__dirname}/app.version.json`);

/** Used to parse terminal input **/
const arg = (argList => {
  let arg = {}, a, opt, thisOpt, curOpt;

  for (a = 0; a < argList.length; a++) {
    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');

    if (opt === thisOpt) {
      // argument value
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;
    } else {
      // argument name
      curOpt = opt;
      arg[curOpt] = true;
    }
  }

  return arg;

})(process.argv);

/** Hash generator **/
function makeid() {
  let text = "";
  const possible = "0123456789";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

try {
  const obj = file.toObject();
  let major = obj.major;
  let minor = obj.minor;
  let patch = obj.patch;
  let build = obj.build;

  if(arg.type === 'major') {
    file.set("major", major + 1);
    file.set("minor", 0);
    file.set("patch", 0);

    console.log(major++);
  } else if(arg.type === 'minor') {
    file.set("minor", minor + 1);
  } else if(arg.type === 'patch') {
    file.set("patch", patch + 1);
  } else {
    return console.log('Build type: ' + arg.type + ' does not exist');
  }

  file.set("hash", makeid());
  file.set("build", build + 1);

  file.save();

  console.log('Version is now: ' + obj.major + '.' + obj.minor + '.' + obj.patch + '-' + obj.hash + '-' + obj.build);
} catch(error) {
  console.log(error);
}
