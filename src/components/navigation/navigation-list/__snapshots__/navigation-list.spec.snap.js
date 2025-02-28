/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["sbb-navigation-list should render named slots if data-ssr-child-count attribute is set"] = 
`<span
  class="sbb-navigation-list__label"
  id="sbb-navigation-link-label-id"
>
  <slot name="label">
  </slot>
</span>
<ul
  aria-labelledby="sbb-navigation-link-label-id"
  class="sbb-navigation-list__content"
>
  <li class="sbb-navigation-list__action">
    <slot name="action-0">
    </slot>
  </li>
  <li class="sbb-navigation-list__action">
    <slot name="action-1">
    </slot>
  </li>
  <li class="sbb-navigation-list__action">
    <slot name="action-2">
    </slot>
  </li>
</ul>
<span hidden="">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-navigation-list should render named slots if data-ssr-child-count attribute is set */

snapshots["sbb-navigation-list renders"] = 
`<span
  class="sbb-navigation-list__label"
  id="sbb-navigation-link-label-id"
>
  <slot name="label">
  </slot>
</span>
<ul
  aria-labelledby="sbb-navigation-link-label-id"
  class="sbb-navigation-list__content"
>
  <li class="sbb-navigation-list__action">
    <slot name="action-0">
    </slot>
  </li>
  <li class="sbb-navigation-list__action">
    <slot name="action-1">
    </slot>
  </li>
  <li class="sbb-navigation-list__action">
    <slot name="action-2">
    </slot>
  </li>
  <li class="sbb-navigation-list__action">
    <slot name="action-3">
    </slot>
  </li>
</ul>
<span hidden="">
  <slot>
  </slot>
</span>
`;
/* end snapshot sbb-navigation-list renders */

