import { createApp } from 'vue';
import CkConfirmComponent from './components/CkConfirm.vue';
import CkNotifyComponent from './components/CkNotify.vue';

const defaultDuration = 2000;

export default {
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
    const instance = createApp(CkConfirmComponent)
    const instanceMounted = instance.mount(tempDiv);
    // set variables
    instanceMounted.title = title;
    instanceMounted.msg = msg;
    instanceMounted.acceptText = acceptText;
    instanceMounted.cancelText = cancelText;
    document.body.appendChild(instanceMounted.$el);
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
    instance.title = title;
    instance.text = text;
    instance.color = color;
    instance.duration = duration || defaultDuration;
    instance.closeCallback = () => {
      app.unmount();
    //   instance.$el.remove();
    }
  },
  notifySuccess(text: string, title: string = '') {
    this.notify({ text, title, color: 'success' });
  },
  notifyError (text: string, title: string = '') {
    this.notify({ text, title, color: 'danger'}); 
  },
  notifyWarning(text: string, title: string = '') {
    this.notify({ text, title, color: 'warning'});
  },
};
