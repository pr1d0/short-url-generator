class Api {
    static url: string = 'http://localhost:3200';
    static version: string = 'v1';
    static token: string | undefined;

    static async fetch(endpoint: string, payload?: any, method: string = 'POST'): Promise<any> {
        return fetch(`${this.url}/${this.version}/${endpoint}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`,
                },
                body: payload ? JSON.stringify(payload) : null,
            })
            .then(this.handleApiResponse)
            .then(this.handleApiErrors)
            .catch(this.handleErrors);
    }

    static async get(endpoint: string): Promise<any> {
        return this.fetch(endpoint, null, 'GET');
    }
    
    static async post(endpoint: string, payload: any = null): Promise<any> {
        return this.fetch(endpoint, payload);
    }

    static handleApiResponse(response: Response): Promise<any> {
        return response.json();
    }

    static handleApiErrors(data: any): any {
        if (data.code) {
            console.error('Api Errors:', data);
        }

        return data;
    }

    static handleErrors(errors: any): void {
        console.error('Request Errors:', errors);
    }
}

export default Api;