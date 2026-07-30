# Union-Find Pattern Collection

Related: #200, #547, #684, #721, #990, #1135, #1202, #1584

---

## Problem Description
The *Accounts Merge* problem requires merging user accounts that share common email addresses. Each account is represented by a name followed by a list of emails. If two accounts have any email in common, they belong to the same person and must be merged into a single account containing the union of their emails.

## Examples
**Example 1**
Input: `[["John", "johnsmith@mail.com", "john00@mail.com"], ["John", "johnnybravo@mail.com"], ["John", "johnsmith@mail.com", "john_newyork@mail.com"]]`
Output: `[["John", "john00@mail.com", "john_newyork@mail.com", "johnsmith@mail.com"], ["John", "johnnybravo@mail.com"]]`
Explanation: The first and third accounts share "johnsmith@mail.com" and are merged.

**Example 2**
Input: `[["Emily", "emily@mail.com"], ["Emily", "emily@mail.com", "emily2@mail.com"]]`
Output: `[["Emily", "emily@mail.com", "emily2@mail.com"]]`
Explanation: Both accounts belong to the same person.

## Approach
**Algorithm:** Union‑Find (Disjoint Set Union)
1. Map each email to a unique index.
2. Initialize UnionFind with the total number of unique emails.
3. For each account, union the first email with every other email in that account.
4. After all unions, group emails by their root parent.
5. Sort each group and prepend the account name.

## Walkthrough
| Step | Action | UnionFind State |
|------|--------|----------------|
| 1 | Map emails to indices | email→id mapping created |
| 2 | Union emails in first account | parents of "johnsmith@mail.com" and "john00@mail.com" merged |
| 3 | Union emails in third account | "johnsmith@mail.com" and "john_newyork@mail.com" merged |
| 4 | Group by root | Two groups formed: {johnsmith, john00, john_newyork}, {johnnybravo} |
| 5 | Build result | Sorted emails combined with name |

## Complexity Analysis
- **Time:** O(N α(N)) where N is total number of emails and α is the inverse Ackermann function (practically constant).
- **Space:** O(N) for the UnionFind structure and email mappings.

## Follow‑Up Questions
1. How would you handle streaming accounts where new accounts arrive continuously?
2. Can the solution be adapted to merge accounts based on phone numbers as well?
3. What changes are needed if the input size is too large to fit in memory?

## Key Takeaway
Union‑Find efficiently merges groups with overlapping elements by providing near‑constant time union and find operations.

---

## Union-Find Template

```text
CLASS UnionFind:
    CONSTRUCTOR(n):
        parent ← [0..n-1]
        rank ← [0] * n

    FUNCTION find(x):
        IF parent[x] != x:
            parent[x] ← find(parent[x])    // path compression
        RETURN parent[x]

    FUNCTION union(x, y):
        px, py ← find(x), find(y)
        IF px == py: RETURN false
        // Union by rank
        IF rank[px] < rank[py]: SWAP(px, py)
        parent[py] ← px
        IF rank[px] == rank[py]: rank[px] ← rank[px] + 1
        RETURN true
```

### When to Use Union-Find vs BFS/DFS

| Use Union-Find When | Use BFS/DFS When |
|---------------------|------------------|
| Edges arrive incrementally | Full graph available |
| Need to check connectivity quickly | Need shortest path |
| Kruskal's MST | Single-source problems |
| Dynamic connectivity | One-time traversal |
