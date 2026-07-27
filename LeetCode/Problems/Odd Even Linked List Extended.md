# Linked List Rearrangement Patterns

Related: #143, #328, #86, #725

---

| Problem | Pattern |
|---------|---------|
| Reorder List (#143) | Find mid → reverse second half → merge alternating |
| Odd Even LL (#328) | Separate odd/even indexed → concatenate |
| Partition List (#86) | Two dummy lists → concatenate |
| Split LL in Parts (#725) | Compute sizes → split sequentially |

### Odd Even Template

```
FUNCTION oddEvenList(head):
    IF head == null: RETURN null
    odd = head
    even = head.next
    evenHead = even

    WHILE even AND even.next:
        odd.next = even.next
        odd = odd.next
        even.next = odd.next
        even = even.next

    odd.next = evenHead
    RETURN head
```
