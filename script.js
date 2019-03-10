let app = new Vue({
    el: '#app',
    data: {
        selected: '',
        disp_bldg: false,
        bldgs: [
            {
                number: "6",
                lights: 5,
                cartridges: 4,
                ballasts: 3,
            },
            {
                number: "7",
                lights: 5,
                cartridges: 4,
                ballasts: 3,
            },
            {
                number: "8",
                lights: 5,
                cartridges: 4,
                ballasts: 3,
            },
            {
                number: "9",
                lights: 5,
                cartridges: 4,
                ballasts: 3,
            },
            {
                number: "10",
                lights: 5,
                cartridges: 4,
                ballasts: 3,
            },
            {
                number: "14",
                lights: 5,
                cartridges: 4,
                ballasts: 3,
            },
            {
                number: "15",
                lights: 5,
                cartridges: 4,
                ballasts: 3,
            },
            {
                number: "25",
                lights: 5,
                cartridges: 4,
                ballasts: 3,
            },
            {
                number: "26",
                lights: 5,
                cartridges: 4,
                ballasts: 3,
            },
            {
                number: "27",
                lights: 5,
                cartridges: 4,
                ballasts: 3,
            },
            {
                number: "28",
                lights: 5,
                cartridges: 4,
                ballasts: 3,
            },
            {
                number: "29",
                lights: 5,
                cartridges: 4,
                ballasts: 3,
            },
            {
                number: "30",
                lights: 5,
                cartridges: 4,
                ballasts: 3,
            },
        ],
    },
    computed: {},
    methods: {
        show_bldg() {
            this.disp_bldg = true;
        },
        subtract_light() {
            for (let i = 0; i < this.bldgs.length; i++) {
                if (this.bldgs[i].number === this.selected) {
                    if (this.bldgs[i].lights > 0) {
                        this.bldgs[i].lights -= 1;
                    }
                }
            }
        },
        add_light() {
            for (let i = 0; i < this.bldgs.length; i++) {
                if (this.bldgs[i].number === this.selected) {
                    this.bldgs[i].lights += 1;
                }
            }
        },
        subtract_cartridge() {
            for (let i = 0; i < this.bldgs.length; i++) {
                if (this.bldgs[i].number === this.selected) {
                    if (this.bldgs[i].cartridges > 0) {
                        this.bldgs[i].cartridges -= 1;
                    }
                }
            }
        },
        add_cartridge() {
            for (let i = 0; i < this.bldgs.length; i++) {
                if (this.bldgs[i].number === this.selected) {
                    this.bldgs[i].cartridges += 1;
                }
            }
        },
        subtract_ballast() {
            for (let i = 0; i < this.bldgs.length; i++) {
                if (this.bldgs[i].number === this.selected) {
                    if (this.bldgs[i].ballasts > 0) {
                        this.bldgs[i].ballasts -= 1;
                    }
                }
            }
        },
        add_ballast() {
            for (let i = 0; i < this.bldgs.length; i++) {
                if (this.bldgs[i].number === this.selected) {
                    this.bldgs[i].ballasts += 1;
                }
            }
        },
    },
    /*
    methods: {
        async completeItem(item) {
            try {
                const response = axios.put("/api/items/" + item.id, {
                    text: item.text,
                    completed: !item.completed,
                });
                this.getItems();
            } catch (error) {
                console.log(error);
            }
        },
        async getItems() {
            try {
                const response = await axios.get("/api/items");
                this.items = response.data;
            } catch (error) {
                console.log(error);
            }
        },
        async addItem() {
            try {
                const response = await axios.post("/api/items", {
                    text: this.text,
                    completed: false
                });
                this.text = "";
                this.getItems();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteItem(item) {
            try {
                const response = await axios.delete("/api/items/" + item.id);
                this.getItems();
            } catch (error) {
                console.log(error);
            }
        },
        showAll() {
            this.show = 'all';
        },
        showActive() {
            this.show = 'active';
        },
        showCompleted() {
            this.show = 'completed';
        },
        deleteCompleted() {
            this.items.forEach(item => {
                if (item.completed)
                    this.deleteItem(item);
            });
        },
    }*/
});
/*data: {
        number: '',
        max: '',
        current: {
            title: '',
            img: '',
            alt: ''
        },
        loading: true,
        addedName: '',
        addedComment: '',
        comments: {},
        ratings: {},
    },
    created() {
        this.xkcd();
    },
    computed: {
        month() {
            var month = new Array;
            if (this.current.month === undefined)
                return '';
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            return month[this.current.month - 1];
        },
        average() {
            if (this.ratings[this.number] === undefined) {
                return '';
            } else {
                var ave = this.ratings[this.number].sum / this.ratings[this.number].total;
                return Math.round(ave * 10) / 10
            }
        }
    },
    watch: {
        number(value, oldvalue) {
            if (oldvalue === '') {
                this.max = value;
            } else {
                this.xkcd();
            }
        }
    },
    methods: {
        async xkcd() {
            try {
                this.loading = true;
                const response = await axios.get('https://xkcd.now.sh/' + this.number);
                this.current = response.data;
                this.loading = false;
                this.number = response.data.num;
            } catch (error) {
                console.log(error);
                this.number = this.max;
            };
        },
        previousComic() {
            this.number = this.current.num - 1;
            if (this.number < 1)
                this.number = 1;
        },
        nextComic() {
            this.number = this.current.num + 1;
            if (this.number > this.max)
                this.number = this.max
        },
        getRandom(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
        },
        randomComic() {
            this.number = this.getRandom(1, this.max);
        },
        addComment() {
            if (!(this.number in this.comments))
                Vue.set(app.comments, this.number, new Array);
            this.comments[this.number].push({
                author: this.addedName,
                text: this.addedComment,
                date: new moment().format('MMM D, YYYY h:mm a')
            });
            this.addedName = '';
            this.addedComment = '';
        },
        firstComic() {
            this.number = 1;
        },
        lastComic() {
            this.number = this.max;
        },
        setRating(rating) {
            if (!(this.number in this.ratings))
                Vue.set(this.ratings, this.number, {
                    sum: 0,
                    total: 0,
                    average: 0
                });
            this.ratings[this.number].sum += rating;
            this.ratings[this.number].total += 1;
        },
    }
});*/
