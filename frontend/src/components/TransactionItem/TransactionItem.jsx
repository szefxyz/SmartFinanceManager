import { useState, useRef, useEffect } from "react";
import { categories } from "../../config/categories";
import { MdEdit, MdDelete, MdCheck, MdClose } from "react-icons/md";
import styles from "./TransactionItem.module.css";

export function TransactionItem({
  transaction,
  isEditing,
  editForm,
  setEditForm,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const actionsRef = useRef(null);

  useEffect(() => {
    if (!openMenu) return;

    const handleClickOutside = (e) => {
      if (actionsRef.current && !actionsRef.current.contains(e.target)) {
        setOpenMenu(false);
        setConfirmDelete(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [openMenu]);

  const { Icon } = categories[transaction.category] || categories.Default;

  return (
    <li className={styles.transactionRow}>
      <div className={styles.transactionItem}>
        {isEditing ? (
          <div className={styles.transactionEditInline}>
            <input
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
              autoFocus
            />

            <input
              type="number"
              value={editForm.amount}
              onChange={(e) =>
                setEditForm({ ...editForm, amount: e.target.value })
              }
            />

            <select
              value={editForm.category}
              onChange={(e) =>
                setEditForm({ ...editForm, category: e.target.value })
              }
            >
              {Object.keys(categories).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={editForm.date}
              onChange={(e) =>
                setEditForm({ ...editForm, date: e.target.value })
              }
            />
          </div>
        ) : (
          <>
            <div className={styles.transactionDetails}>
              <div className={styles.icon}>
                <Icon />
              </div>

              <div className={styles.transactionInfo}>
                <p className={styles.transactionTitle}>{transaction.title}</p>
                <span className={styles.transactionCategory}>
                  {transaction.category}
                </span>
              </div>
            </div>

            <div className={styles.transactionMeta}>
              <span
                className={
                  transaction.amount < 0
                    ? styles.transactionAmountNegative
                    : styles.transactionAmountPositive
                }
              >
                {transaction.amount < 0 ? "- " : ""}$
                {Math.abs(transaction.amount)}
              </span>

              <span className={styles.transactionDate}>
                {new Date(transaction.date).toLocaleDateString()}
              </span>
            </div>
          </>
        )}
      </div>

      <div
        ref={actionsRef}
        className={styles.transactionActions}
        onClick={(e) => e.stopPropagation()}
      >
        {isEditing ? (
          <>
            <button className={styles.check} onClick={onSave}>
              <MdCheck />
            </button>
            <button className={styles.cancel} onClick={onCancel}>
              <MdClose />
            </button>
          </>
        ) : (
          <>
            <button className={styles.edit} onClick={onEdit}>
              <MdEdit />
            </button>

            <button className={styles.delete} onClick={onDelete}>
              <MdDelete />
            </button>

            <button
              className={styles.more}
              onClick={() => {
                setOpenMenu((v) => !v);
                setConfirmDelete(false);
              }}
            >
              ⋮
            </button>

            {openMenu && (
              <div className={styles.menu}>
                {!confirmDelete ? (
                  <>
                    <button
                      onClick={() => {
                        onEdit();
                        setOpenMenu(false);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className={styles.danger}
                      onClick={() => setConfirmDelete(true)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <div className={styles.confirmText}>
                      Delete this transaction?
                    </div>

                    <button
                      className={styles.danger}
                      onClick={() => {
                        onDelete();
                        setOpenMenu(false);
                        setConfirmDelete(false);
                      }}
                    >
                      Yes, delete
                    </button>

                    <button
                      onClick={() => {
                        setConfirmDelete(false);
                        setOpenMenu(false);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </li>
  );
}
