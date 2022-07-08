import "./styles.css";

const commentsListWrapper = document.querySelector(".comments-list-wrapper");
const commentInputTemplate = document.querySelector("#comment-input-template");
const commentTemplate = document.querySelector("#comment-template");
const newCommentWrapper = document.querySelector(".new-comment-wrapper");

// render comment to the page

/* 
comment {
  id,
  message,
  level,
  replies,
  parentId
}
*/

// render the comment input
const renderInput = () => {
  // pick up the commentInputTemplate
  const commentTemplateNode = commentInputTemplate.content.cloneNode(true);
  const textArea = commentTemplateNode.querySelector(".input-area");
  if (textArea.classList.contains("hidden")) {
    textArea.classList.remove("hidden");
  }
  // Append it to newCommentWrapper
  newCommentWrapper.append(commentTemplateNode);
};

const createCommentNode = (comment) => {
  // prepare the comment node
  const commentTemplateEl = document.importNode(commentTemplate.content, true);
  const commentInputTemplateEl = document.importNode(
    commentInputTemplate.content,
    true
  );
  const commentContainerEl = commentTemplateEl.querySelector(
    ".comment-container"
  );
  const contentEl = commentContainerEl.querySelector(".content");
  // const nestedCommentEl = commentContainerEl.querySelector('.nested-comment');
  const replyInputEl = commentContainerEl.querySelector(".reply-input");

  commentContainerEl.id = comment.id;
  contentEl.textContent = comment.message;

  // const newInputEl = commentInputTemplateEl.content.cloneNode(true);

  replyInputEl.append(commentInputTemplateEl);
  commentContainerEl.append(replyInputEl);

  return commentContainerEl;
};

const renderCommentNode = (node) => {
  // Append the node to commentsListWrapper
  commentsListWrapper.append(node);
};

newCommentWrapper.addEventListener("keydown", (e) => {
  if (e.target.classList.contains("input-area") && e.keyCode === 13) {
    // create comment
    const id = Date.now().toString();
    const replies = [];
    const level = 0;
    const parentId = null;
    const newComment = new Comment(
      id,
      e.target.value.trim(),
      replies,
      level,
      parentId
    );

    // create comment node
    const newCommentNode = createCommentNode(newComment);

    // renderCommentNode
    renderCommentNode(newCommentNode);
  }
});

(function () {
  renderInput();
})();

class Comment {
  constructor(id, message, replies, level, parentId) {
    this.id = id;
    this.message = message;
    this.replies = replies;
    this.level = level;
    this.parentId = parentId;
  }
}
