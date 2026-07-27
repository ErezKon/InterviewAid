# 1634. Add Two Polynomials Represented as Linked Lists

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/add-two-polynomials-represented-as-linked-lists](https://leetcode.com/problems/add-two-polynomials-represented-as-linked-lists)
**Companies:** Amazon

---

## 1. Problem Description

Given two linked lists representing polynomials where each node has `coefficient` and `power`, return their sum as a linked list sorted by power in descending order.

---

## 2. Key Insight

> Merge two sorted linked lists by power, combining coefficients for the same power. Similar to merging sorted lists, but we add coefficients when powers match.

---

## 3. Approach: Merge — O(n + m) ✅

```
FUNCTION addPoly(poly1, poly2):
    dummy = new ListNode(0, -1)
    curr = dummy
    
    WHILE poly1 AND poly2:
        IF poly1.power > poly2.power:
            curr.next = poly1; poly1 = poly1.next
        ELSE IF poly1.power < poly2.power:
            curr.next = poly2; poly2 = poly2.next
        ELSE:
            sum = poly1.coefficient + poly2.coefficient
            IF sum != 0:
                curr.next = new ListNode(sum, poly1.power)
                curr = curr.next
            poly1 = poly1.next; poly2 = poly2.next
    
    curr.next = poly1 IF poly1 ELSE poly2
    RETURN dummy.next
```

| Time | Space |
|------|-------|
| O(n + m) | O(1) extra |

---

## Key Takeaway

> Polynomial addition is essentially merging two sorted lists by power, with coefficient summation on power matches. Skip zero coefficients.
