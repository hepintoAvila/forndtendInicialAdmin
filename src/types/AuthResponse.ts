export type  AuthResponse = {
    data: {
      Auth: {
        Nom: string;
        Idsuario: string;
        Usuario: string;
        Email: string;
        Rol: string;
        AppKey: string;
        AppToken: string;
        alea_actuel: string;
        entidad: string;
        status: string;
        id_evaluacion: string;
      };
      Permisos: any[];
      Menus: any[];
    };
  }

export type  Auth = {
        Nom?: string;
        Idsuario?: string;
        Usuario?: string;
        Email?: string;
        Rol?: string;
        Apikey?: string;
        ApiToken?: string;
        entidad?: string;
        status?: string;
        id_evaluacion?: string;
}