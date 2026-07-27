# Linked List Reversal Patterns

Related: #24, #25, #92, #206, #234, #143

---

| Problem | Pattern |
|---------|---------|
| Reverse Linked List (#206) | Full reversal |
| Reverse II (#92) | Reverse between positions |
| Swap Pairs (#24) | Reverse in groups of 2 |
| Reverse k-Group (#25) | Reverse in groups of k |
| Palindrome LL (#234) | Reverse second half + compare |
| Reorder List (#143) | Find mid + reverse second half + merge |

### Template: Reverse a Sublist

```
FUNCTION reverseSublist(head, left, right):
    dummy = new Node(0)
    dummy.next = head
    prev = dummy

    FOR i ← 1 TO left - 1:
        prev = prev.next

    curr = prev.next
    FOR i ← 0 TO right - left - 1:
        next = curr.next
        curr.next = next.next
        next.next = prev.next
        prev.next = next

    RETURN dummy.next
```
