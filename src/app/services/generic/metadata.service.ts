import { environment } from './../../../environments/environment';
import { Meta, Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

export interface MetaDetails {
  title: string;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private readonly imageBaseUrl = environment.imageBaseUrl;
  private readonly defaultURL = 'https://P-linker.net/';
  private readonly defaultTitle = 'P-linker';
  private readonly defaultDescription = 'P-linker Site Description';
  private readonly defaultImage =
    'https://avatars.githubusercontent.com/u/52158422?s=48&v=4';

  constructor(private titleService: Title, private metaService: Meta) { }

  updateTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  getTitle(): string {
    return this.titleService.getTitle();
  }

  private createTagObject(tag: {
    name?: string;
    property?: string;
    content: string;
    scheme?: string;
  }): any {
    const newTag: any = tag.name
      ? { name: tag.name, content: tag.content }
      : { property: tag.property, content: tag.content };
    if (tag.scheme) {
      newTag['scheme'] = tag.scheme;
    }
    return newTag;
  }

  private addOrUpdateMetaTags(metaTags: any[]): void {
    metaTags.forEach((tag) => {
      if (this.metaService.getTag(`name="${tag.name}"`)) {
        this.metaService.updateTag(tag);
      } else {
        this.metaService.addTag(tag);
      }
    });
  }

  updateMetaTagsForSEO(meta: MetaDetails, fullPageUrl?: string): void {
    console.log(meta);
    const title = meta.title || this.defaultTitle;
    const description = meta.description || this.defaultDescription;
    const image =
      meta.image ? `${this.imageBaseUrl}/${meta.image}` : this.defaultImage;
    const url = fullPageUrl || this.defaultURL;

    this.updateTitle(title);
    this.addOrUpdateMetaTags([
      { name: 'title', content: title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'twitter:title', content: title },
      { property: 'og:description', content: description },
      { property: 'twitter:description', content: description },
      { property: 'og:image', content: image },
      { property: 'twitter:image', content: image },
      { property: 'og:url', content: url },
      { property: 'twitter:url', content: url },
    ]);
  }

  //Update Meta Individual
  updateMetaTagsName(metaTags: { name: string, content: string, scheme?: string }[]): void {
    metaTags.forEach(tag => this.metaService.updateTag(this.createTagObject(tag)));
  }
  updateMetaTagsProperty(metaTags: { property: string, content: string, scheme?: string }[]): void {
    metaTags.forEach(tag => this.metaService.updateTag(this.createTagObject(tag)));
  }
}
