const App = {
  data() {
    return {
      title: 'Notes',
      input: {
        value: '',
        placeholder: 'Type your note',
      },
      notes: ['task 1', 'task 2', 'task 3'],
      editedNote: {
        id: null,
        text: null
      }
    };
  },

  methods: {
    onSubmit() {
      this.notes.push(this.input.value);

      this.input.value = '';
    },
    remove(index) {
      console.log(`note ${index} has been removed`);
      this.notes.splice(index, 1);
    },
    getNotes() {
      const localNotes = JSON.parse(localStorage.getItem('notes'));

      if (localNotes) {
        this.notes = localNotes;
      }
    },
    edit(index) {
      this.editedNote.id = index
      this.editedNote.text = this.notes[index]
    },
    saveChanges(e) {
      this.notes[this.editedNote.id] = e.target.value
      this.editedNote.id = null
      this.editedNote.text = null
    }
  },

  watch: {
    notes: {
      handler(updatedList) {
        localStorage.setItem('notes', JSON.stringify(updatedList));
      },
      deep: true,
    },
  },

  mounted() {
    this.getNotes();
  },
};

Vue.createApp(App).mount('#app');
