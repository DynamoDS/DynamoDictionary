import _ from 'lodash';
let resort = {};

resort.removeDuplicates = function (data) {
    data.forEach(function (d, i) {
        var c = 0;
        data.forEach(function (e, j) {
            if (_.isEqual(d, e)) {
                c++;
                if (c > 1) {
                    data.splice(j, 1)
                }
            }
        })
    })
    return data;
}

resort.sortArrayOfObjectsByKey = function (arr, key) {
    if (arr[0][key] !== "Action" && arr[0][key] !== "Create" && arr[0][key] !== "Query") {
        arr.sort(function (a, b) {
            var keyA = (a[key]),
                keyB = (b[key]);
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
    } else {
        var tempob = {
            "Create": "a",
            "Action": "b",
            "Query": "c"
        };
        arr.sort(function (a, b) {
            var keyA = (tempob[a[key]]),
                keyB = (tempob[b[key]]);
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
    }
    return arr;
}

resort.objectify = function (ad, q) {
    if (Array.isArray(ad)) {
        var ml = [];
        ad.forEach(function (d, i) {
            var c = d.Categories;
            var lineage = [];
            for (var t = 0; t < q; t++) {
                lineage.push(c[t]);
            }
            if (q < c.length) {
                if (ml.length === 0) {
                    ml.push({
                        "Name": c[q],
                        "Arr": [d],
                        "Lineage": lineage,
                        "iteration": q
                    })
                } else {
                    var hit = false;
                    ml.forEach(function (f, k) {
                        if (f["Name"] === c[q]) {
                            hit = true;
                            f["Arr"].push(d)
                        }
                    })
                    if (hit === false) {
                        ml.push({
                            "Name": c[q],
                            "Arr": [d],
                            "Lineage": lineage,
                            "iteration": q
                        })
                    }
                }
            } else {
                if (ml.length === 0) {
                    ml.push({
                        "Name": d.Group,
                        "Arr": [d],
                        "Lineage": lineage,
                        "iteration": q
                    })
                } else {
                    hit = false;
                    ml.forEach(function (f, k) {
                        if (f["Name"] === d.Group) {
                            hit = true;
                            f["Arr"].push(d)
                        }
                    })
                    if (hit === false) {
                        ml.push({
                            "Name": d.Group,
                            "Arr": [d],
                            "Lineage": lineage,
                            "iteration": q
                        })
                    }
                }
            }
            if (i === ad.length - 1) {
                ml.forEach(function (h, z) {
                    resort.sortArrayOfObjectsByKey(h.Arr, "Name");
                })
            }
        })
        return resort.sortArrayOfObjectsByKey(ml, "Name");
    } else {
        return ad;
    }
}

resort.objectifyChildren = function (dm) {
    dm.forEach(function (d, i) {
        d.Parent = 'Home';
        d.iterationId = i;
        d.Arr = resort.objectify(d.Arr, 1, i)
        d.Arr.forEach(function (e, j) {
            e.Parent = d;
            e.iterationId = j;
            if (e.Name !== "Create" && e.Name !== "Action" && e.Name !== "Query") {
                e.Arr = resort.objectify(e.Arr, 2, i)
            }
            if (e.Arr) {
                recursiveParents(e, 3, i);
            }
        })
    })
    return dm;
}

function recursiveParents(e, it, i) {
    e.Arr.forEach(function (f, g) {
        f.Parent = e;
        f.iterationId = g;
        if (f.Name !== "Create" && f.Name !== "Action" && f.Name !== "Query") {
            f.Arr = resort.objectify(f.Arr, it, i)
        }
        if (f.Arr) {
            recursiveParents(f, it + 1, i);
        }
    })
}

export default resort;
