var startDate = dateFns.startOfDay(Date.UTC(2020, 8, 17, 0, 0, 0));

var dates = {
    "Varati": dateFns.addWeeks(startDate, 0),
    "HIP 17862": dateFns.addWeeks(startDate, 1),
    "Pleiades Sector PN-T b3-0": dateFns.addWeeks(startDate, 2),
    "Synuefe PR-L b40-1": dateFns.addWeeks(startDate, 3),
    "HIP 18120": dateFns.addWeeks(startDate, 4),
    "IC 2391 Sector CQ-Y c16": dateFns.addWeeks(startDate, 5),
    "Kappa-1 Volantis": dateFns.addWeeks(startDate, 6),
    "Epsilon Indi": dateFns.addWeeks(startDate, 7)
}

function get_date(system) {

    console.log("startDate: " + startDate)

    var d = dates[system]

    const dayINeed = 4; // for Thursday


    const today = dateFns.startOfDay(new Date())


    //const today = dateFns.startOfDay(new Date())
    //console.log("today: " + dateFns.format(today, 'MMMM DD, YYYY'))
    const todayDay = dateFns.getISODay(today);


    var currentjump = dateFns.setISODay(today, dayINeed)
    // if we haven't yet passed the day of the week that I need:
    if (todayDay <= dayINeed) {
        // then just give me this week's instance of that day
        currentjump = dateFns.setISODay(dateFns.subWeeks(today, 1), dayINeed);
    }

    var weekstoadd = dateFns.differenceInWeeks(d, currentjump) % 8;
    if (weekstoadd < 0) {
        weekstoadd = 8 + weekstoadd
    }
    var newdate = dateFns.addWeeks(currentjump, weekstoadd)
    begindate = dateFns.startOfDay(Date.UTC(dateFns.getYear(newdate) + 1286, dateFns.getMonth(newdate), dateFns.getDate(newdate), 0, 0, 0));
    var enddate = dateFns.addWeeks(begindate, 1)
    //return newdate.format('YYYY-MM-DD')

    retval = dateFns.format(newdate, 'MMMM DD, YYYY') + ' - ' + dateFns.format(enddate, 'MMMM DD, YYYY')
    currentLocation = (dateFns.differenceInDays(newdate, currentjump) == 0)



    return { startdate: begindate, enddate: enddate, currentLocation: currentLocation }
}

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function get_full_schedule() {
    var retval = []
    Object.keys(dates).forEach(function (key) {
        d = get_date(key)
        item = { "name": key, startdate: dateFns.format(d.startdate, 'MMMM DD, YYYY'), enddate: dateFns.format(d.enddate, 'MMMM DD, YYYY'), currentLocation: d.currentLocation }
        console.log(item)
        retval.push(item)
    });


    return sortByKey(retval, "startdate")
}