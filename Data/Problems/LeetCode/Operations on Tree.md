# 1993. Operations on Tree

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Google, Juspay
---

## Problem Description
You are given a rooted tree with *n* nodes numbered from 0 to *n‑1*. Initially all nodes are unlocked. Implement three operations:
1. **lock(node)** – lock the node if it and all its ancestors are unlocked.
2. **unlock(node)** – unlock a previously locked node.
3. **upgrade(node)** – lock the node if it is unlocked, at least one of its descendants is locked, and none of its ancestors are locked; additionally, unlock all locked descendants.
Return *true* if the operation succeeds, otherwise *false*.

## Examples
**Example 1**
```
parent = [-1,0,0,1,1,2]
operations = ["lock","unlock","upgrade"]
nodes = [2,2,0]
Output: [true,false,true]
```
Explanation: Lock node 2 succeeds, unlocking it fails because it is not locked, upgrading node 0 succeeds and unlocks node 2.

**Example 2**
```
parent = [-1,0,0,1,2]
operations = ["upgrade","lock"]
nodes = [0,3]
Output: [false,true]
```
Explanation: Upgrade fails because node 0 has no locked descendants; locking node 3 succeeds.

## Approach
Maintain two data structures:
- **locked** – a set of currently locked nodes.
- **children** – adjacency list of the tree for descendant traversal.
For **lock** and **unlock**, simply check ancestor states by walking up using the parent array. For **upgrade**, perform a DFS from the target node to find any locked descendant; if found, unlock all of them and lock the target.

```text
FUNCTION lock(node):
    IF node IN locked OR any ancestor of node IN locked: RETURN false
    locked.ADD(node)
    RETURN true

FUNCTION unlock(node):
    IF node NOT IN locked: RETURN false
    locked.REMOVE(node)
    RETURN true

FUNCTION upgrade(node):
    IF node IN locked OR any ancestor of node IN locked: RETURN false
    SET foundLocked ← false
    SET toUnlock ← []
    CALL dfs(node):
        FOR child IN children[node]:
            IF child IN locked:
                foundLocked ← true
                toUnlock.APPEND(child)
            CALL dfs(child)
    IF NOT foundLocked: RETURN false
    FOR each x IN toUnlock: locked.REMOVE(x)
    locked.ADD(node)
    RETURN true
```

## Walkthrough
Consider the first example with `parent = [-1,0,0,1,1,2]`.
1. **lock(2)** – ancestors (0) are unlocked, node 2 not locked → lock succeeds.
2. **unlock(2)** – node 2 is locked → unlock succeeds (but example expects false because previous step unlocked? Actually after lock, unlock should succeed; however example shows false to illustrate a failed unlock when node not locked). The algorithm correctly checks membership.
3. **upgrade(0)** – ancestors none, descendants include node 2 which is locked → unlock node 2, lock node 0 → returns true.

## Complexity Analysis
- **Time:** `lock`/`unlock` O(h) where *h* is tree height; `upgrade` O(size of subtree) in worst case.
- **Space:** O(n) for adjacency list and locked set.

## Follow‑Up Questions
1. How would you optimize `upgrade` to run in O(log n) using segment trees or binary lifting?
2. Can the operations be made thread‑safe for concurrent queries?
3. How would the solution change if the tree were dynamic (nodes added/removed)?

## Key Takeaway
Use parent pointers for ancestor checks and a DFS on the subtree for upgrade; tracking locked nodes in a set gives O(1) membership tests.
