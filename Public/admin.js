let app = new Vue({
    el: '#admin',
    data: {
        buildings: [],        //array of all buildings
        bldg_num: null,       //building number for a new building
        name: '',             //item name for a new item
        current_number: null, //current_number for a new item
        stocked_number: null, //stocked_number for a new item
        item_bldg: '',        //Number of the building for adding/ removing items
    },
    created() {
        this.getBuildings();
    },
    methods: {
        async getBuildings() {
            let response = await axios.get("/api/bldgs");
            this.buildings = response.data;
        },
        async addBldg() {
            try {
                let response = await axios.post("/api/bldgs", {
                    building: this.bldg_num,
                });
                this.bldg_num = '';
                this.getBuildings();
            } catch (error) {
                console.log(error)
            }

        },
        async removeBldg(building_number) {
            try {
                let building = null;
                for (let i = 0; i < this.buildings.length; i++) {
                    if (this.buildings[i].building === Number(building_number)) {
                        building = this.buildings[i];
                    }
                }
                let response = axios.delete("/api/bldgs/" + building._id);
                this.bldg_num = '';
                this.selected = '';
                this.disp_bldg = false;
            } catch (error) {
                console.log(error);
            }
        },
        async addItem(building_number) {
            try {
                let building = null;
                for (let i = 0; i < this.buildings.length; i++) {
                    if (this.buildings[i].building === Number(building_number)) {
                        building = this.buildings[i];
                    }
                }
                let response = await axios.put("/api/bldgs/" + building._id, {
                    name: this.name,
                    current_number: this.current_number,
                    stocked_number: this.stocked_number,
                });
            } catch (error) {
                console.log(error);
            }

        },
        async removeItem(building_number) {
            try {
                let building = null;
                for (let i = 0; i < this.buildings.length; i++) {
                    if (this.buildings[i].building === Number(building_number)) {
                        building = this.buildings[i];
                    }
                };
                let response = await axios.put('/api/bldgs/remove/' + building._id, {
                    name: this.name,
                });
            } catch (error) {
                console.log(error);
            }

        },
    }
});