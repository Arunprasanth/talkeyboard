define([
    "antie/widgets/component",
    "antie/widgets/button",
    "antie/widgets/label",
    "antie/widgets/keyboard",
    'antie/widgets/verticallist',
    'antie/widgets/componentcontainer',
],
    function (Component, Button, Label, Keyboard, VerticalList, ComponentContainer) {

        // All components extend Component
        return Component.extend({
            init: function init() {
                var self, label, button;

                self = this;
                init.base.call(this, "simplecomponent");
                this.label = new Label("Click to watch keyboard");
                var _button = new Button("sample-button");
                _button.appendChildWidget(this.label);
                this.label1 = new Label("test");
                var _button1 = new Button("sample-button1");
                _button1.appendChildWidget(this.label1);
                logInVerticalList = new VerticalList("login-verticallist");
                logInVerticalList.appendChildWidget(_button);
                logInVerticalList.appendChildWidget(_button1);
                this.appendChildWidget(logInVerticalList);

                this.addEventListener("beforerender", function (ev) {
                    self._onBeforeRender(ev);
                });
                _button.addEventListener("select", function (ev) {
                    keys = ['SPACE','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','DEL','1','2','3','4','5','6','7','8','9','0','.','-','_','!','@','.co.uk','.com'];
                    myVirtualKeyBoard = new Keyboard("Keyboard", 23, 2 ,keys, true , true);
                    myVirtualKeyBoard.setActiveChildKey('A');
                    logInVerticalList.appendChildWidget(myVirtualKeyBoard);
                    myVirtualKeyBoard.addEventListener("select", function (ev) {
                    self.label1.setText(myVirtualKeyBoard._currentText);

                    });
                });
                // calls Application.ready() the first time the component is shown
                // the callback removes itself once it's fired to avoid multiple calls.
                this.addEventListener("aftershow", function appReady() {
                    self.getCurrentApplication().ready();
                    self.removeEventListener('aftershow', appReady);
                });
            },

            // Appending widgets on beforerender ensures they're still displayed
            // if the component is hidden and subsequently reinstated.
            _onBeforeRender: function () {
                // this.appendChildWidget(this._button);
            }
        });
    }
);