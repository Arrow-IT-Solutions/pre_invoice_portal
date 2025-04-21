import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthGuardService } from './Core/guard/auth-guard.service';
import { ContentLayoutAdminComponent } from './layout/content-layout-admin/content-layout-admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'verify',
    pathMatch: 'full',
  },
  // {
  //   path: 'layout',
  //   component: ContentLayoutComponent,
  //   // canActivate: [AuthGuardService],
  //   children: [
  //     {
  //       path: 'home',
  //       loadChildren: () =>
  //         import('./modules/home/home.module').then(
  //           (m) => m.HomeModule
  //         ),
  //     },
  //   ],
  // },
  {
    path: 'layout-admin',
    component: ContentLayoutAdminComponent,
    // canActivate: [AuthGuardService],
    children: [
      // {
      //   path: 'clients',
      //   loadChildren: () =>
      //     import('./modules/clients/clients.module').then(
      //       (m) => m.ClientsModule
      //     )
      // },
      // {
      //   path: 'Advertisement',
      //   loadChildren: () =>
      //     import('./modules/advertisement/advertisement.module').then(
      //       (m) => m.AdvertisementModule
      //     )
      // },
      // {
      //   path: 'employees',
      //   loadChildren: () =>
      //     import('./modules/employees/employees.module').then(
      //       (m) => m.EmployeesModule
      //     )
      // },
      // {
      //   path: 'categories',
      //   loadChildren: () =>
      //     import('./modules/categories/categories.module').then(
      //       (m) => m.CategoriesModule
      //     )
      // },
      // {
      //   path: 'dashBoard',
      //   loadChildren: () =>
      //     import('./modules/dashboard/dashboard.module').then(
      //       (m) => m.DashboardModule
      //     )
      // },
      // {
      //   path: 'category-event',
      //   loadChildren: () =>
      //     import('./modules/category-event/category-event.module').then(
      //       (m) => m.CategoryEventModule
      //     )
      // },
      // {
      //   path: 'events',
      //   loadChildren: () =>
      //     import('./modules/events/events.module').then(
      //       (m) => m.EventsModule
      //     )
      // },
      // {
      //   path: 'feedback',
      //   loadChildren: () =>
      //     import('./modules/feedback/feedback.module').then(
      //       (m) => m.FeedbackModule
      //     )
      // },
      // {
      //   path: 'notification',
      //   loadChildren: () =>
      //     import('./modules/notification/notification.module').then(
      //       (m) => m.NotificationModule
      //     )
      // },
      // {
      //   path: 'rewards',
      //   loadChildren: () =>
      //     import('./modules/rewards/rewards.module').then(
      //       (m) => m.RewardsModule
      //     )
      // },
      // {
      //   path: 'password',
      //   loadChildren: () =>
      //     import('./modules/Password/password.module').then(
      //       (m) => m.PasswordModule
      //     )
      // },
      // {
      //   path: 'category-group',
      //   loadChildren: () =>
      //     import('./modules/category-group/category-group.module').then(
      //       (m) => m.CategoryGroupModule
      //     )
      // },
      // {
      //   path: 'group-item',
      //   loadChildren: () =>
      //     import('./modules/group-item/group-item.module').then(
      //       (m) => m.GroupItemModule
      //     )
      // },
      // {
      //   path: 'earned',
      //   loadChildren: () =>
      //     import('./modules/earned/earned.module').then(
      //       (m) => m.EarnedModule
      //     )
      // },
      // {
      //   path: 'transfer',
      //   loadChildren: () =>
      //     import('./modules/transfer/transfer.module').then(
      //       (m) => m.TransferModule
      //     )
      // },
      // {
      //   path: 'redeem-history',
      //   loadChildren: () =>
      //     import('./modules/redeem-history/redeem-history.module').then(
      //       (m) => m.RedeemHistoryModule
      //     )
      // },

    ],
  },

  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },

  // {
  //   path: 'verify',
  //   component: VerifyComponent,
  //   loadChildren: () =>
  //     import('./modules/Verify/verify.module').then((m) => m.VerifyModule),
  // },

  // {
  //   path: 'segments',
  //   component: AuthLayoutComponent,
  //   loadChildren: () =>
  //     import('./modules/segments/segments.module').then(
  //       (m) => m.SegmentsModule
  //     ),
  // },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
