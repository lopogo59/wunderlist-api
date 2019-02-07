/*
 * Wunderlist-api v1.0.0
 * https://github.com/felipesousa/wunderlist-api
 *
 * MIT license @ 2016 Felipe Sousa
 * https://github.com/felipesousa/wunderlist-api/blob/master/LICENSE
 *
 * Date: 2016-03-16
 * Last Modified: 2017-05-29
 */

'use strict';

export default class Wunderlist {

  constructor(config) {
    this.headers = () => {
      return {
        headers: {
          'X-Access-Token': config.accessToken,
          'X-Client-ID': config.clientId,
          'Content-Type': 'application/json'
        }
      }
    }
    this.endpoint = 'https://a.wunderlist.com/api/v1/';
    this.request = require('request');
  }

  paths(path) {
    let options = Object.assign(path, this.headers());
    return this.promise(options);
  }

  async promise(options) {
    return await new Promise(async (resolve, reject) => {
      await this.request(options, (err, response, body) => {
        if (err) { reject(err); }

        if (response) {
          resolve(typeof response.body === "object" ? response.body : JSON.parse(response.body));
        }
      });
    })
  }

  getLists() {
    let url = {
      url: this.endpoint + 'lists',
      method: 'GET'
    }

    return this.paths(url);
  }

  getList(listId) {
    let url = {
      url: this.endpoint + 'lists/' + listId,
      method: 'GET'
    }

    return this.paths(url);
  }

  createList(title) {
    let url = {
      url: this.endpoint + 'lists',
      method: 'POST',
      json: {
        "title": title
      }
    }

    return this.paths(url);
  }

  updateList(listId, revision, title) {
    let url = {
      url: this.endpoint + 'lists/' + listId,
      method: 'PATCH',
      json: {
        "revision": revision,
        "title": title
      }
    }

    return this.paths(url);
  }

  stateList(listId, revision, statePublic) {
    let url = {
      url: this.endpoint + 'lists/' + listId,
      method: 'PATCH',
      json: {
        "revision": revision,
        "public": statePublic
      }
    }

    return this.paths(url);
  }

  deleteList(listId, revision) {
    let url = {
      url: this.endpoint + 'lists/' + listId + '?revision=' + revision,
      method: 'DELETE'
    }

    return this.paths(url);
  }

  listUsers() {
    let url = {
      url: this.endpoint + 'users',
      method: 'GET'
    }

    return this.paths(url);
  }

  getTasks(id) {
    let url = {
      url: this.endpoint + 'tasks?list_id=' + id,
      method: 'GET'
    }

    return this.paths(url);
  }

  getTasksForState(id, state) {
    let url = {
      url: this.endpoint + 'tasks?list_id=' + id + '&completed=' + state,
      method: 'GET'
    }

    return this.paths(url);
  }

  getTask(id) {
    let url = {
      url: this.endpoint + 'tasks/' + id,
      method: 'GET'
    }

    return this.paths(url);
  }

  createTask(task) {
    let url = {
      url: this.endpoint + 'tasks',
      method: 'POST',
      json: task
    }

    return this.paths(url);
  }
  updateTask(id, revision, body) {
    let url = {
      url: this.endpoint + 'tasks/' + id,
      method: 'PATCH',
      json: Object.assign(body, {revision: revision})
    }
    return this.paths(url);
  }
  deleteTask(id, revision) {
    let url = {
      url: this.endpoint + 'tasks/' + id + '?revision=' + revision,
      method: 'DELETE'
    }

    return this.paths(url);
  }

  user() {
    let url = {
      url: this.endpoint + 'user',
      method: 'GET'
    }

    return this.paths(url);
  }

  avatar(userId, size, fallback) {
    let key = {
      headers: {
        'Content-Type': 'image/png'
      }
    }

    let url = {
      url: this.endpoint + 'avatar?user_id=' + userId + '&size=' + size + '&fallback=' + fallback,
      method: 'GET'
    }

    const options = this._.extend(url, key);

    return this.promise(options);
  }

  getMembership() {
    let url = {
      url: this.endpoint + 'memberships',
      method: 'GET'
    }

    return this.paths(url);
  }

  addMember(userId, listId, muted) {
    let url = {
      url: this.endpoint + 'memberships',
      method: 'POST',
      json: {
        "list_id": listId,
        "user_id": userId,
        "muted": muted
      }
    }

    return this.paths(url);
  }

  removeMember(userId, muted, revision) {
    let url = {
      url: this.endpoint + 'memberships/' + userId,
      method: 'DELETE',
      json: {
        "revision": revision
      }
    }

    return this.paths(url);
  }

  commentsList(listId) {
    let url = {
      url: this.endpoint + 'task_comments?list_id=' + listId,
      method: 'GET'
    }

    return this.paths(url);
  }

  commentsTask(taskId) {
    let url = {
      url: this.endpoint + 'task_comments?task_id=' + taskId,
      method: 'GET'
    }

    return this.paths(url);
  }

  createComment(taskId, text) {
    let url = {
      url: this.endpoint + 'task_comments',
      method: 'POST',
      json: {
        "task_id": taskId,
        "text": text
      }
    }

    return this.paths(url);
  }

  subtaskList(listId) {
    let url = {
      url: this.endpoint + 'subtasks?list_id=' + listId,
      method: 'GET'
    }

    return this.paths(url);
  }

  subtaskComment(taskId) {
    let url = {
      url: this.endpoint + 'subtasks?task_id=' + taskId,
      method: 'GET'
    }

    return this.paths(url);
  }

  subtaskListState(listId, completed) {
    let url = {
      url: this.endpoint + 'subtasks?list_id=' + listId + '&completed=' + completed,
      method: 'GET'
    }

    return this.paths(url);
  }

  subtaskCommentState(taskId, completed) {
    let url = {
      url: this.endpoint + 'subtasks?list_id=' + taskId + '&completed=' + completed,
      method: 'GET'
    }

    return this.paths(url);
  }

  createSubstask(taskId, title, completed) {
    let url = {
      url: this.endpoint + 'subtasks',
      method: 'POST',
      json: {
        "task_id": taskId,
        "title": title,
        "completed": completed
      }
    }

    return this.paths(url);
  }

  deleteSubtask(subtaskId, revision) {
    let url = {
      url: this.endpoint + 'subtasks/' + subtaskId + '?revision=' + revision,
      method: 'DELETE'
    }

    return this.paths(url);
  }

  notesList(listId) {
    let url = {
      url: this.endpoint + 'notes?list_id=' + listId,
      method: 'GET'
    }

    return this.paths(url);
  }

  notesTask(taskId) {
    let url = {
      url: this.endpoint + 'notes?task_id=' + taskId,
      method: 'GET'
    }

    return this.paths(url);
  }

  createNote(taskId, content) {
    let url = {
      url: this.endpoint + 'notes',
      method: 'POST',
      json: {
        "task_id": taskId,
        "content": content,
      }
    }

    return this.paths(url);
  }

  deleteNote(noteId, revision) {
    let url = {
      url: this.endpoint + 'notes/' + noteId + '?revision=' + revision,
      method: 'DELETE'
    }

    return this.paths(url);
  }
}
