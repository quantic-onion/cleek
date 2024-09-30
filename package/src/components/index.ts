// showers
export { default as CkDatetimeShower } from './showers/ck-datetime-shower.vue';
export { default as CkTimeShower } from './showers/ck-time-shower.vue';

// components
export { default as CkDropdown } from './ck-dropdown/ck-dropdown.vue';
export { default as CkNavbar } from './ck-navbar/ck-navbar.vue';
export { default as CkTable } from './ck-table/ck-table.vue';
export { default as CkPagination } from './ck-table/ck-pagination/ck-pagination.vue';
export { default as CkTd } from './ck-table/ck-td.vue';
export { default as CkTh } from './ck-table/ck-th.vue';
export { default as CkTr } from './ck-table/ck-tr.vue';
// input
export { default as CkInputDate } from './ck-input/ck-input-date.vue';
export { default as CkInputTime } from './ck-input/ck-input-time.vue';
// export { default as CkDropdownContent } from './ck-dropdown/ck-dropdown-content.vue';
// export { default as CkDropdownItem } from './ck-dropdown/ck-dropdown-item.vue';
// tabs
export { default as CkTab } from './ck-tabs/ck-tab.vue';
export { default as CkTabs } from './ck-tabs/ck-tabs.vue';
// toggle
export { default as CkToggle } from './ck-toggle/ck-toggle.vue';

export { default as CkButton } from './ck-button.vue';
export { default as CkCard } from './ck-card.vue';
export { default as CkCheckbox } from './ck-checkbox.vue';
export { default as CkChip } from './ck-chip.vue';
export { default as CkCircle } from './ck-circle.vue';
export { default as CkDiv } from './ck-div.vue';
export { default as CkIcon } from './ck-icon.vue';
export { default as CkImg } from './ck-img.vue';
export { default as CkInput } from './ck-input.vue';
export { default as CkLabel } from './ck-label.vue';
export { default as CkPopup } from './ck-popup.vue';
export { default as CkRadio } from './ck-radio.vue';
export { default as CkSelect } from './ck-select.vue';
export { default as CkSidebar } from './ck-sidebar.vue';
export { default as CkSwitch } from './ck-switch.vue';
export { default as CkSwitchOptions } from './ck-switch-options.vue';
export { default as CkTextarea } from './ck-textarea.vue';
// export { default as CkRouterLink } from './not-avaible/ck-router-link.vue';

export { default as useWindowWidth } from '../hooks/windowWidth';
export { default as ckNotify } from './ck-notify/ck-notify';

// export { default as Input } from './not-avaible/Input.vue'
// export { default as ckLink } from './not-avaible/Link.vue'
// export { default as ckModal } from './not-avaible/Modal.vue'
// export { default as ckModalManager } from './not-avaible/ModalManager.vue'
// export { default as ckProgress } from './not-avaible/Progress.vue'
// export { default as ckSidebar } from './not-avaible/Sidebar.vue'
// export { default as ckSidebarManager } from './not-avaible/SidebarManager.vue'

// export { default as EVENTS } from '../utils/events'
// export { default as EventBus } from '../utils/mitt'
// export { lockScroll, unlockScroll } from '../utils/scrollLock'

export class TableData {
  search = '';
  currentPage = 1;
  listLength = 0;
  itemsPerPage = 20;
  isLoading = false;
  isEmpty = true;

  constructor(itemsPerPage: number) {
    if (itemsPerPage) {
      this.itemsPerPage = itemsPerPage;
    }
  }
}

type RowId = number;

export class SelectedRows {
  ids = new Set([]);
  toggleable = true;

  constructor(list: RowId[], settings?: { toggleable: boolean }) {
    this.ids = new Set(list);
    if (settings) this.toggleable = settings.toggleable;
  }

  isRowSelected(id: RowId) {
    return this.ids.has(id);
  }
  isAnyRowsSelected(ids: RowId[]) {
    return ids.some((id) => this.isRowSelected(id));
  }
  areAllRowsSelecteds(ids: RowId[]) {
    return ids.every((id) => this.isRowSelected(id));
  }
  switchValue(id: RowId) {
    if (this.isRowSelected(id)) {
      this.removeRow(id);
    } else {
      this.addRow(id);
    }
  }
  addRow(id: RowId) {
    this.ids.add(id);
  }
  removeRow(id: RowId) {
    this.ids.delete(id);
  }
  addManyRows(ids: RowId[]) {
    ids.forEach((id) => this.ids.add(id));
  }
  removeManyRows(ids: RowId[]) {
    ids.forEach((id) => this.ids.delete(id));
  }
  removeAll() {
    this.ids.clear();
  }
}