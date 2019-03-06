function Calendar() {
    // let date=new Date();
    this.year=1970;
    this.month=1;
    this.day=1;
    this.weekday=1;
    this.curWeek=1;
}
Calendar.prototype={
    format(){
        let month = this.month < 10? "0" + this.month : this.month;
        let day = this.day < 10? "0" + this.day : this.day;
        return `${this.year}-${month}-${day}`;
    },
    getDaysNum(){
        //获取每月天数
        switch (this.month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
            case 2:
                return this.isLeap(this.year)? 29:28;
        }
    },
    /*判断闰年*/
    isLeap(year){
        return (!(year % 4) && year % 100)? true : !(year % 400);
    },
    getWeekday(day) {
        let date=new Date(this.year,this.month-1,day);
        // date.setDate(1);
        return date.getDay();
    },
    getCurDay(callBack){
        let aLi=$(".days li");
        aLi.each((index,value)=>{
            if(value.innerHTML===""+this.day)
            callBack(value);
        })
    },
    getRemainWeek(){
        let aUl=$(".days:last ul");
        return aUl.map((index,value)=>{
            if(index!==this.curWeek-1)
            return value
        });
    },
    getTotalWeek(){
        let firstWeekDay=this.getWeekday(1);
        let daysNum=this.getDaysNum();
        return Math.ceil((daysNum-(7-firstWeekDay))/7)+1;
    },
    nextWeek(){
        let daysNum=this.getDaysNum();
        //当前周最后一天的日期是否大于本月天数
        if(this.day+6-this.weekday>=daysNum)
        {
            //显示下一月的第一周
            this.month++;
            if(this.month>12)
            {
                this.month=1;
                this.year++;
            }
            this.curWeek=1;
            this.day=1;
            this.weekday=this.getWeekday(this.day);
            //隐藏当前月的信息
            $(".days").remove();
            //添加下个月信息
            calendarUpdate();
            $(".calendar_date .days").addClass("slideCalendar")
        }
        else if(this.day+6-this.weekday<daysNum)
        {
            //显示当前月的下一周
            this.curWeek++;
            this.day=this.day+7-this.weekday;
            this.weekday=this.getWeekday(this.day);
            //删除当前月的信息
            // $(".days").remove()
        }
    },
    prevWeek(){
        //当前周第一天的日期是否<=1
        if(this.day-this.weekday<=1) {
            //显示上一月的最后一周
            this.month--;
            if(this.month<1)
            {
                this.year--;
                this.month=12;
            }
            this.curWeek = this.getTotalWeek();
            let daysNum=this.getDaysNum();
            this.day=daysNum-this.getWeekday(daysNum);
            this.weekday=this.getWeekday(this.day);
            //删除当前月的信息
            $(".days").remove();
            //添加上个月信息
            calendarUpdate();
            $(".calendar_date .days").addClass("slideCalendar")
        }

        else if(this.day-this.weekday>1)
        {
            //显示当前月的上一周
            this.curWeek--;
            this.day=this.day-this.weekday-1;
            this.weekday=this.getWeekday(this.day);
            //删除当前月的信息
            // $(".days").remove()
        }
    },
    nextMonth(){
        this.month++;
        this.curWeek=1;
        this.day=1;
        this.weekday=this.getWeekday(1);
        if(this.month>12)
        {
            this.year++;
            this.month=1
        }
        //删除当前月的信息
        $(".days").remove()
    },
    prevMonth(){
        this.month--;
        this.curWeek=1;
        this.day=1;
        this.weekday=this.getWeekday(1);
        if(this.month<1)
        {
            this.year--;
            this.month=12;
        }
        //删除当前月的信息
        $(".days").remove()
    },
    today(){
        let date=new Date();
        this.year=date.getFullYear();
        this.month=date.getMonth()+1;
        this.day=date.getDate();
        this.weekday=date.getDay();
        this.curWeek=Math.ceil((this.day+6-this.weekday) / 7);
        //删除当前月的信息
        $(".days").remove();
    }
}