// import Vue from 'vue';

import { Pagination, Dialog, Menu, Submenu, MenuItem, MenuItemGroup, Input, InputNumber, Checkbox, CheckboxButton, CheckboxGroup, Select, Option, Button, ButtonGroup, Table, TableColumn, DatePicker, Popover, Tooltip, Form, FormItem, Tabs, TabPane, Tag, Alert, Icon, Card, Transfer, Container, Header, Aside, Main, Footer, Image, PageHeader, CascaderPanel, Loading, MessageBox, Message, Notification, Avatar, Result, Descriptions, DescriptionsItem } from "element-ui";

const element = {
  install: (Vue) => {
    Vue.use(Descriptions);
    Vue.use(DescriptionsItem);
    Vue.use(Pagination);
    Vue.use(Dialog);
    Vue.use(Menu);
    Vue.use(Submenu);
    Vue.use(MenuItem);
    Vue.use(MenuItemGroup);
    Vue.use(Input);
    Vue.use(InputNumber);
    Vue.use(Checkbox);
    Vue.use(CheckboxButton);
    Vue.use(CheckboxGroup);
    Vue.use(Result);
    Vue.use(Select);
    Vue.use(Option);
    Vue.use(Button);
    Vue.use(ButtonGroup);
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(DatePicker);
    Vue.use(Popover);
    Vue.use(Tooltip);
    Vue.use(Form);
    Vue.use(FormItem);
    Vue.use(Tabs);
    Vue.use(TabPane);
    Vue.use(Tag);
    Vue.use(Alert);
    Vue.use(Icon);
    Vue.use(Avatar);
    Vue.use(Card);
    Vue.use(Transfer);
    Vue.use(Container);
    Vue.use(Header);
    Vue.use(Aside);
    Vue.use(Main);
    Vue.use(Footer);
    Vue.use(Image);
    Vue.use(PageHeader);
    Vue.use(CascaderPanel);
    Vue.use(Loading.directive);
    Vue.prototype.$loading = Loading.service;
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
    Vue.prototype.$confirm = MessageBox.confirm;
    Vue.prototype.$prompt = MessageBox.prompt;
    Vue.prototype.$notify = Notification;
    Vue.prototype.$message = function (type, message) {
      Message({
        type,
        message: message,
      });
    };
  },
};

export default element;
