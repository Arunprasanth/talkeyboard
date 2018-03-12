require.def('IMG/appui/main', [
        'antie/application',
        'antie/widgets/container'
    ],
    function(Application, Container) {

        return Application.extend({
            init: function init(appDiv, styleDir, imgDir, callback) {
                var self;
                self = this;

                init.base.call(this, appDiv, styleDir, imgDir, callback);

                // Sets the root widget of the application to be
                // an empty container
                self._setRootContainer = function() {
                    var container = new Container();
                    container.outputElement = appDiv;
                    self.setRootWidget(container);
                };
            },

            run: function() {
                // Called from run() as we need the framework to be ready beforehand.
                this._setRootContainer();
                // Create maincontainer and add simple component to it
                this.addComponentContainer("maincontainer", "IMG/appui/components/login");
            }
        });
    }
);