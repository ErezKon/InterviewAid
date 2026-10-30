# 2307. Check for Contradictions in Equations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-for-contradictions-in-equations](https://leetcode.com/problems/check-for-contradictions-in-equations)
**Companies:** Amazon, Uber

---

## 1. Problem Description

You are given a 2D array of strings `equations` and an array of real numbers `values`, where `equations[i] = [A_i, B_i]` and `values[i]` means that `A_i / B_i = values[i]`.

Determine if there exists a contradiction in the equations. Return `true` *if there is a contradiction, or* `false` *otherwise*.

**Note**:
- When checking if two numbers are equal, check that their **absolute difference** is less than `10^-5`.
- The testcases are generated such that there are no cases targeting precision, i.e. using `double` is enough to solve the problem.

**Constraints:**
- `1 <= equations.length <= 100`
- `equations[i].length == 2`
- `1 <= A_i.length, B_i.length <= 5`
- `A_i`, `B_i` consist of lowercase English letters.
- `equations.length == values.length`
- `0.0 < values[i] <= 10.0`
- `values[i]` has a maximum of 2 decimal places.

---

## 2. Examples

```
Example 1:
  Input: equations = [["a","b"],["b","c"],["a","c"]], values = [3,0.5,1.5]
  Output: false
  Explanation:
  The given equations are: a / b = 3, b / c = 0.5, a / c = 1.5
  There are no contradictions in the equations. One possible assignment to satisfy all equations is:
  a = 3, b = 1 and c = 2.
```

```
Example 2:
  Input: equations = [["le","et"],["le","code"],["code","et"]], values = [2,5,0.5]
  Output: true
  Explanation:
  The given equations are: le / et = 2, le / code = 5, code / et = 0.5
  Based on the first two equations, we get code / et = 0.4.
  Since the third equation is code / et = 0.5, we get a contradiction.
```

---

## 3. Approach: Weighted Graph Consistency — O(V+E) ✅

```text
FUNCTION checkContradictions(equations, values):
    // Build bidirectional weighted graph
    graph ← MAP of LIST
    FOR (a,b), val IN ZIP(equations, values):
        APPEND (b, val) TO graph[a]
        APPEND (a, 1.0 / val) TO graph[b]
    
    ratios ← MAP   // variable → value relative to component root
    FOR node IN graph KEYS():
        IF node IN ratios: CONTINUE
        SET ratios[node] ← 1.0
        queue ← [node]
        WHILE queue NOT EMPTY:
            SET cur ← POP(queue)
            FOR (nbr, weight) IN graph[cur]:
                SET expected ← ratios[cur] / weight
                IF nbr IN ratios:
                    IF ABS(ratios[nbr] - expected) > 1e-5:
                        RETURN true   // contradiction found
                ELSE:
                    SET ratios[nbr] ← expected
                    APPEND nbr TO queue
    RETURN false   // all components consistent
```

---

## 4. Walkthrough

Take equations `a/b = 2.0`, `b/c = 3.0`, `a/c = 7.0`.

1. Build graph:
   - a → b (2.0), b → a (0.5)
   - b → c (3.0), c → b (1/3)
   - a → c (7.0), c → a (1/7)
2. Start BFS at `a`, set `ratios[a] = 1.0`.
3. Visit `b` via edge a→b: `ratios[b] = 1.0 / 2.0 = 0.5`.
4. Visit `c` via b→c: `ratios[c] = 0.5 / 3.0 ≈ 0.1667`.
5. Edge a→c expects `ratios[c] = 1.0 / 7.0 ≈ 0.1429`.
6. Difference > 1e-5 → contradiction → return `true`.

---

## 5. Complexity Analysis

- **Time:** O(V + E) – each variable and equation visited once during BFS/DFS.
- **Space:** O(V + E) – adjacency list and ratio map.

---

## 6. Follow-Up Questions

- How would you adapt the algorithm for integer ratios with exact arithmetic?
- Can you detect contradictions incrementally as equations are added one by one?
- What changes are needed if equations involve multiplication instead of division?

---

## Key Takeaway

> Weighted graph consistency check: assign values via BFS/DFS, and if a revisited node gets a different value (beyond epsilon), it's a contradiction. Same pattern as Evaluate Division but for validation.
