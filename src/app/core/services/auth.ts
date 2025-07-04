import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

// ¡Nuevas importaciones de Firebase Auth!
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore); // Inyectar Firestore

  // 2. Obtenemos el estado de autenticación y los datos del usuario directamente de Firebase
  public isLoggedIn$: Observable<boolean> = authState(this.auth).pipe(map(user => !!user));
  public currentUser$: Observable<User | null> = authState(this.auth);

  constructor() { }

  // 3. Método de Login real
  async login(email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      return null;
    }
  }

  // 4. Método de Registro real
  async register(name: string, email: string, password: string): Promise<User | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });

      // Guardar datos adicionales en Firestore
      const userDocRef = doc(this.firestore, `users/${userCredential.user.uid}`);
      await setDoc(userDocRef, {
        uid: userCredential.user.uid,
        email: email,
        displayName: name,
        // Aquí podemos añadir más campos en el futuro
      });

      return userCredential.user;
    } catch (error) {
      console.error("Error en el registro:", error);
      return null;
    }
  }

  // 5. Método de Logout real
  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
