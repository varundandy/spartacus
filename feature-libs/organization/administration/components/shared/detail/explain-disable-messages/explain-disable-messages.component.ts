import { Component, Input, OnInit } from '@angular/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ItemService } from '../../item.service';
import { BaseItem } from '../../organization.model';

@Component({
  selector: 'cx-explain-disable-messages',
  templateUrl: './explain-disable-messages.component.html',
  host: { class: 'content-wrapper' },
})
export class ExplainDisableMessagesComponent<T extends BaseItem>
  implements OnInit {
  /**
   * The disabled state is calculated but can be provided as well.
   */
  @Input() disabled: boolean;

  /**
   * The localization of messages is based on the i18n root. Messages are
   * concatenated to the root, such as:
   *
   * `[i18nRoot].messages.disabledEdit`
   */
  @Input() i18nRoot: string;

  /**
   * To configure the messages to display
   */
  @Input() displayMessageConfig: {
    disabledEdit?: boolean;
    disabledEnable?: boolean;
    disabledCreate?: boolean;
  };

  /**
   * resolves the current item.
   */
  current$: Observable<T> = this.itemService.current$;

  constructor(protected itemService: ItemService<T>) {}
  iconTypes = ICON_TYPE;

  ngOnInit() {
    if (!this.displayMessageConfig) {
      this.displayMessageConfig = {
        disabledEdit: true,
        disabledEnable: true,
        disabledCreate: false,
      };
    }
  }

  isParentDisabled(item: T): boolean {
    return (
      this.disabled ??
      !(item.orgUnit || (item as any).unit || (item as any).parentOrgUnit)
        ?.active
    );
  }
}