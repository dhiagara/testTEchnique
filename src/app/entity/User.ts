export class User {
  private id;
  private _nom;
  private _prenom;
  private _nombre_enfants;
  public image?;

  get nom() {
    return this._nom;
  }

  set nom(value) {
    this._nom = value;
  }

  get prenom() {
    return this._prenom;
  }

  set prenom(value) {
    this._prenom = value;
  }

  get nombre_enfants() {
    return this._nombre_enfants;
  }

  set nombre_enfants(value) {
    this._nombre_enfants = value;
  }
}
