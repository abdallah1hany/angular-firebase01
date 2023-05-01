import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Subscription, map } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  exercises$!: Observable<any[]>;
  constructor(
    private trainingService: TrainingService,
    private firestore: AngularFirestore
  ) {



  }

  ngOnInit() {

     this.firestore.collection('availableExercises').valueChanges().subscribe((res) => {
      console.log(res);

     });
    this.exercises$ = this.firestore.collection('availableExercises').valueChanges();
  }



  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
