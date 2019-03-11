import { Component, ViewChild, ElementRef, AfterViewChecked, OnInit } from '@angular/core';
// this needs to come first
import 'reflect-metadata';
// so lets stick it up here
import { FrontendApplication } from '@theia/core/lib/browser';
import { Container, ContainerModule } from 'inversify';
import { FrontendApplicationConfigProvider } from '@theia/core/lib/browser/frontend-application-config-provider';
import { frontendApplicationModule } from '@theia/core/lib/browser/frontend-application-module';
import { messagingFrontendModule } from '@theia/core/lib/browser/messaging/messaging-frontend-module';
import { loggerFrontendModule } from '@theia/core/lib/browser/logger-frontend-module';
import browserMenuModule from '@theia/core/lib/browser/menu/browser-menu-module';
import { ThemeService, BuiltinThemeProvider } from '@theia/core/lib/browser/theming';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements AfterViewChecked {

  title = 'ang-theia2';
  @ViewChild('theia') theiaRef: ElementRef;


  ngAfterViewChecked(): void {
    this.runApplication(this.theiaRef.nativeElement);
  }

  runApplication(appElement: HTMLElement) {
    // FrontendApplicationConfigProvider.set({
    //   applicationName: 'Theia',
    //   defaultTheme: 'dark'
    // });


    try {
    const container = new Container();
    container.load(browserMenuModule);
    container.load(frontendApplicationModule);
    container.load(messagingFrontendModule);
    container.load(loggerFrontendModule);
    container.load(this.getFrontendModule(appElement));

    const themeService = ThemeService.get();
    themeService.loadUserTheme();

    const application = container.get(FrontendApplication);
    application.start();
    } catch (error) {
      // console.error('Failed to start the frontend application.');
      // if (error) {
      //     console.error(error);
      // }
    }
  }

  getFrontendModule(host: HTMLElement) { return new ContainerModule((bind, unbind, isBound, rebind) => {
    class MyFrontendApplication extends FrontendApplication {
      protected getHost(): Promise<HTMLElement> {
        return Promise.resolve(host);
      }
    }
    rebind(FrontendApplication).to(MyFrontendApplication).inSingletonScope();

  });
}
}
