import { createApp } from 'vue';
import CkConfirmComponent from './components/CkConfirm.vue';
import CkAlertComponent from './components/CkAlert.vue';
import CkNotifyComponent from './components/CkNotify.vue';

const defaultDuration = 2000;

export default {
  alert(msg: string) {
    this.alertOptions({
      title: '',
      msg,
      acceptText: '',
    });
  },
  alertOptions({
    title = '',
    msg = '',
    acceptText = '',
  }: {
    title: string;
    msg: string;
    acceptText: string;
  }) {
    const tempDiv = document.createElement('div');
    const instance = createApp(CkAlertComponent)
    const instanceMounted = instance.mount(tempDiv);
    // set variables
    // @ts-ignore
    instanceMounted.title = title;
    // @ts-ignore
    instanceMounted.msg = msg;
    // @ts-ignore
    instanceMounted.acceptText = acceptText;
    document.body.appendChild(instanceMounted.$el);
  },
  confirmOptions(
    {
      title = '',
      msg = '',
      acceptText = '',
      cancelText = '',
      success = () => {},
      failure = () => {},
    }: {
      title?: string;
      msg?: string;
      acceptText?: string;
      cancelText?: string;
      success?: () => void;
      failure?: () => void;
    }
  ) {
    const tempDiv = document.createElement('div');
    const app = createApp(CkConfirmComponent)
    const instance = app.mount(tempDiv);
    // set variables
    // @ts-ignore
    instance.title = title;
    // @ts-ignore
    instance.msg = msg;
    // @ts-ignore
    instance.acceptText = acceptText;
    // @ts-ignore
    instance.cancelText = cancelText;
    // @ts-ignore
    instance.responseSuccess = () => {
      app.unmount();
      success();
    }
    // @ts-ignore
    instance.responseFailure = () => {
      app.unmount();
      failure();
    }
    document.body.appendChild(instance.$el);
  },
  confirm(
    msg: string,
    success: () => void,
    failure?: () => void,
  ) {
    this.confirmOptions({
      msg,
      success,
      failure,
    });
  },
  notify({ text = '', title = '', color = '', duration = 0 }) {
    const tempDiv = document.createElement('div');
    const app = createApp(CkNotifyComponent);
    const instance = app.mount(tempDiv);
    // @ts-ignore
    instance.title = title;
    // @ts-ignore
    instance.text = text;
    // @ts-ignore
    instance.color = color;
    // @ts-ignore
    instance.duration = duration || defaultDuration;
    // @ts-ignore
    instance.closeCallback = () => {
      app.unmount();
    }
  },
  notifySuccess(text: string, title: string = '', duration?: number) {
    this.notify({ text, title, color: 'success', duration });
  },
  notifyError(text: string, title: string = '', duration?: number) {
    this.notify({ text, title, color: 'danger', duration}); 
  },
  notifyWarning(text: string, title: string = '', duration?: number) {
    this.notify({ text, title, color: 'warning', duration});
  },
};
