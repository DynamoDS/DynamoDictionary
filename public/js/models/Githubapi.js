function githubSubmitter(files, mainExampleFile, branchName, message, terminate) {
    files.forEach(f => f.original = f.name);
    axios.get('./configuration/config.json').then((resolve, reject) => {
        const token = resolve.data.GitHub_Token;
        runSubmit(token, files, mainExampleFile, branchName, message, terminate)
    })
}
function dynContents(f) {
    // console.log('dyn run', f)
    var file_path = f.og.slice(2).replace("Examples", "EXAMPLES");
    var fileOb = {
        content: f.data,
        isBase64: false
    };
    return [file_path, fileOb];
}

function imageContents(f) {
    // console.log('img run', f)
    var file_path = f.og.slice(2).replace("Examples", "EXAMPLES");
    var file_contents = window.atob((f.data.replace(/^(.+,)/, '')));
    var fileOb = {
        content: file_contents,
        isBase64: true
    };
    return [file_path, fileOb];
}
function runSubmit(token, files, mainExampleFile, branchName, message, terminate) {
    var branchExists = false;
    var prExists = false;
    files.push(mainExampleFile)
    var gh = new Octokit({
        token: token
    });
    var repo = gh.getRepo('DynamoDS', 'DynamoDictionary');
    let existingPullRequests = [];
    repo.getPulls()
        .then(function (pulls) {
            existingPullRequests = pulls;
            if (existingPullRequests.filter(function (pr) {
                return pr.head.ref === branchName;
            }).length > 0) {
                prExists = true;
            }
            return repo.getBranches()
        })
        .then(function (branches) {
            if (branches.filter(function (b) {
                return b[2] === branchName;
            }).length > 0) {
                branchExists = true;
                commitFiles(repo.getBranch(branchName));
            } else {
                // console.log('branch does not exist')
                var branch = repo.getBranch();
                branch.createBranch(branchName)
                    .then(function (b) {
                        commitFiles(repo.getBranch(branchName))
                    })
            }
        })
    function commitFiles(branch) {
        if (files.length > 0) {
            var contents = {};
            files.forEach(function (f) {
                switch (f.type) {
                    case 'image':
                        var ob = imageContents(f);
                        contents[ob[0]] = ob[1];
                        break;
                    case 'xml':
                        var ob = dynContents(f);
                        contents[ob[0]] = ob[1];
                        break;
                    default:
                        contents['data/Dynamo_Nodes_Documentation.json'] = JSON.stringify(f, null, 4);
                        return undefined;
                }
            })
            branch.writeMany(contents, message)
                .then(function () {
                    if (!branchExists && !prExists) {
                        return repo.createPullRequest({
                            "title": branchName,
                            "body": "files updated by user",
                            "head": branchName,
                            "base": "master"
                        })
                    } else {
                        return repo.getPulls();
                    }
                })
                .then(function (result) {
                    if (result.html_url) {
                        terminate(result.html_url);
                    }
                    else {
                        existingPullRequests.forEach((d, i) => {
                            if (d.head.ref === branchName) {
                                terminate(d.html_url)
                            }
                        })
                    }
                })
        }
    }
}
