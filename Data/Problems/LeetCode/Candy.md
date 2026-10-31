# 135. Candy

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/candy](https://leetcode.com/problems/candy)
**Companies:** Accenture, Amazon, Bending Spoons, Bloomberg, Dropbox, Flipkart, Goldman Sachs, Google, Ibm, Infosys, Meta, Microsoft, Morgan Stanley, Oracle, Phonepe, Roku, Salesforce, Sap, Tiktok, Uber, Urban Company, Visa, Walmart Labs

---

## 1. Problem Description

There are `n` children standing in a line.

Each child is assigned a rating value given in the integer array `ratings`.

You are giving candies to these children subjected to the following requirements:

- Each child must have **at least** one candy.
- Children with a **higher** rating get more candies than their neighbors.

Return the **minimum** number of candies you need to have to distribute the candies to the children.

**Constraints:**
- `1 <= n == ratings.length <= 5 * 10^4`
- `0 <= ratings[i] <= 5 * 10^4`

---

## 2. Approach: Two Passes — O(n) ✅

```text
FUNCTION candy(ratings):
    n = len(ratings)
    candies = [1] * n

    // Left to right: handle right neighbors
    FOR i ← 1 TO n - 1:
        IF ratings[i] > ratings[i - 1]:
            candies[i] = candies[i - 1] + 1

    // Right to left: handle left neighbors
    FOR i ← n - 2 DOWN TO 0:
        IF ratings[i] > ratings[i + 1]:
            candies[i] = MAX(candies[i], candies[i + 1] + 1)

    RETURN SUM(candies)
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Examples

**Example 1:**
```
Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
```

**Example 2:**
```
Input: ratings = [1,2,2]
Output: 4
Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
The third child gets 1 candy because it satisfies the above two conditions.
```

---

## 4. Walkthrough

Take `ratings = [1,0,2]`:
1. Initialise `candies = [1,1,1]`.
2. **Left-to-right**:
   - i=1: rating 0 ≤ rating 1 → no change.
   - i=2: rating 2 > rating 0 → `candies[2] = candies[1] + 1 = 2` → `[1,1,2]`.
3. **Right-to-left**:
   - i=1: rating 0 < rating 2 → no change.
   - i=0: rating 1 > rating 0 → `candies[0] = MAX(1, candies[1] + 1) = 2` → `[2,1,2]`.
4. Final candies `[2,1,2]` sum to `5` (minimum satisfying constraints).

---

## 5. Complexity Analysis

- **Time:** O(n) – two linear passes over the ratings array.
- **Space:** O(n) – extra array to store candies for each child.

---

## Follow-Up Questions

- How would the solution change if children could be given any non-negative number of candies (allowing zero)?
- Can you solve the problem in O(1) extra space by modifying the ratings array in-place?
- What if the neighbor constraint applies only to the left neighbor?

---

## Key Takeaway

> Two greedy passes—first left-to-right, then right-to-left—ensure each child satisfies the higher-rating-than-neighbor rule with the minimum total candies.
