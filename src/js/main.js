// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Token from './components/Token'   
//import router from './router'

Vue.config.productionTip = false

var main = new Vue({
    el: '#MapContainer',

    //router,

    data: {
        tokenCount: 0,
        tokenSize: 100,
        tokenColor: "red",
    },

    computed: {
        emptySessionObject: function() {
            return $.isEmptyObject(this.sessionObject);
        }
    },

    components: {
        playerToken : { Token }
    },

    methods: {

        getSharedSession: function() {
            $.ajax({
                method: 'GET',
                url: this.apiOrigin + '/shared-sessions/' + this.key,
                dataType: 'json',
                success: function(response) {
                    if (response.session !== null) {
                        this.sessionObject = response.session;
                        this.sessionObject.public = true;
                        this.sessionObject.color = this.getColorBox(this.sessionObject);
                    } else {
                        _kmq.push(['record', 'Expired Shared Session Load Attempt']);
                    }

                    this.shareDate = response.shareDate;
                    this.teacherName = response.sharingUser.firstName + ' ' + response.sharingUser.lastName;

                    this.loadingSession = false;
                }.bind(this)
            });
        },

        getColorBox: function(session) {
            if (session.ended_at == null) {
                return 'blueRect';
            } else {
                switch (true) {
                    case (session.learning_score === null):
                        return "greyRect";
                        break;
                    case (session.learning_score > 80):
                        return "greenRect";
                        break;
                    case (session.learning_score >= 60):
                        return "yellowRect";
                        break;
                    case (session.learning_score >= 40):
                        return "yellowRect";
                        break;
                    case (session.learning_score < 40 && session.learning_score > 0 ):
                        return "redRect";
                        break;
                    default:
                        return "greyRect";
                        break;
                }
            }
        }
    },

    mounted: function() {
        console.log("Huzzah");
        $("#Spectrum").spectrum({
            color: "#ECC",
            showInput: true,
            className: "fullSpectrum",
            showInitial: true,
            showPalette: true,
            showSelectionPalette: true,
            preferredFormat: "hex",
            localStorageKey: "spectrum.demo",

            change: function(color) {
                this.tokenColor = color.toHexString()
            },
            palette: [
                ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
                    "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
                ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                    "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
                ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                    "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                    "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                    "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                    "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                    "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                    "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                    "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                    "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                    "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
            ]
        });
    }
});
