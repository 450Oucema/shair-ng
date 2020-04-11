export class Fichier {
  constructor(public uuid, public title, public description: string, public details = null, public filename = null, public filetype: string) {
  }
}
