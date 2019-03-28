let app = new Vue({
    el: '#app',
    data: {
        selected: '',     //the number of the building selected from the dropdown
        buildings: [],    //array of all buildings
        disp_bldg: false, //whether to display the building supply list
        
    },
    created() {
        this.getBuildings();
    },
    computed: {
        building_nums() {
            if (this.buildings.length === 0) return [];
            let nums_array = [];
            for (let i = 0; i < this.buildings.length; i++) {
                nums_array.push(this.buildings[i].building)
            };
            return nums_array.sort(function (a, b) {
                return a - b
            });

        },
        items() {
            if (this.selected === '') return [];
            for (let i = 0; i < this.buildings.length; i++) {
                if (this.buildings[i].building === Number(this.selected)) {
                    this.getBuildings();
                    return this.buildings[i].items;
                }
            }
        }
    },
    methods: {
        show_bldg() {
            this.disp_bldg = true;
        },
        async getBuildings() {
            let response = await axios.get("/api/bldgs");
            this.buildings = response.data;
        },
        async decrement(building_number, item_name) {
            try {
                let building = null;
                for (let i = 0; i < this.buildings.length; i++) {
                    if (this.buildings[i].building === Number(building_number)) {
                        building = this.buildings[i];
                    }
                }
                let response = await axios.put("/api/item/" + building._id, {
                    name: item_name,
                    change: -1,
                });
            } catch (error) {
                console.log(error);
            }
        },
        async increment(building_number, item_name) {
            try {
                let building = null;
                for (let i = 0; i < this.buildings.length; i++) {
                    if (this.buildings[i].building === Number(building_number)) {
                        building = this.buildings[i];
                    }
                }
                let response = await axios.put("/api/item/" + building._id, {
                    name: item_name,
                    change: 1,
                });
            } catch (error) {
                console.log(error);
            }

        }
    }
});