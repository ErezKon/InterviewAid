# 1634. Add Two Polynomials Represented as Linked Lists

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/add-two-polynomials-represented-as-linked-lists](https://leetcode.com/problems/add-two-polynomials-represented-as-linked-lists)
**Companies:** Amazon

---

## 1. Problem Description

Given two linked lists representing polynomials where each node has `coefficient` and `power`, return their sum as a linked list sorted by power in descending order.

---

## 2. Examples

**Example 1**
```
Input: poly1 = [(3,2) → (5,1) → (6,0)], poly2 = [(4,3) → (2,2) → (1,0)]
Output: [(4,3) → (5,2) → (5,1) → (7,0)]
Explanation: 3x²+5x+6 + 4x³+2x²+1 = 4x³+5x²+5x+7
```

**Example 2**
```
Input: poly1 = [(1,1)], poly2 = [( -1,1)]
Output: []
Explanation: Coefficients cancel out, resulting in the zero polynomial.
```

---

## 3. Approach: Merge — O(n + m) ✅

```text
FUNCTION addPoly(poly1, poly2):
    dummy ← new ListNode(0, -1)
    curr ← dummy
    WHILE poly1 AND poly2:
        IF poly1.power > poly2.power:
            curr.next ← poly1
            poly1 ← poly1.next
        ELSE IF poly1.power < poly2.power:
            curr.next ← poly2
            poly2 ← poly2.next
        ELSE:
            sumCoeff ← poly1.coefficient + poly2.coefficient
            IF sumCoeff != 0:
                curr.next ← new ListNode(sumCoeff, poly1.power)
                curr ← curr.next
            poly1 ← poly1.next
            poly2 ← poly2.next
    END WHILE
    curr.next ← poly1 IF poly1 ELSE poly2
    RETURN dummy.next
```

---

## 4. Walkthrough

| Step | Action |
|------|--------|
| 1 | Initialise a dummy head to build the result list. |
| 2 | Compare the `power` of the current nodes of both lists. |
| 3 | Append the node with the larger power to the result. |
| 4 | If powers are equal, add the coefficients; if the sum is non‑zero, create a new node with that sum and the shared power. |
| 5 | Advance the pointers of the processed list(s). |
| 6 | After one list is exhausted, link the remaining nodes of the other list. |
| 7 | Return the list after the dummy head. |

---

## 5. Complexity Analysis

- **Time:** O(n + m) – each node of both input lists is visited once.
- **Space:** O(1) extra – the result reuses existing nodes; only a constant amount of auxiliary space is used.

---

## 6. Follow-Up Questions

1. How would you handle polynomials stored in ascending order of power? |
2. How can you modify the algorithm to support multiplication of two polynomial linked lists? |
3. What changes are needed if the coefficients are large integers requiring arbitrary‑precision arithmetic? |

---

## Key Takeaway

> Adding two polynomial linked lists is a classic merge‑like process: traverse both lists in order of decreasing power, combine coefficients when powers match, and preserve the sorted order.
