import {
  ExerciseSheetCommentFragment,
  ExerciseSheetQuery,
} from "@/generated/graphql";

type ComposeItem = {
  cardId: string;
  id: string | number | null;
};

type ComposeItems = Record<string, ComposeItem[]>;

type RestoreTargetType = "OrderedExercise" | "SheetItem";

export type SheetCommentRestoreTarget = {
  comment: ExerciseSheetCommentFragment;
  targetId: string;
  targetType: RestoreTargetType;
};

const buildCommentSignature = (comment: ExerciseSheetCommentFragment) =>
  `${comment.comment}\u0000${comment.isResolved}\u0000${comment.user.id}`;

const getMissingComments = (
  previousComments: ExerciseSheetCommentFragment[],
  nextComments: ExerciseSheetCommentFragment[],
) => {
  const nextCounts = new Map<string, number>();

  for (const comment of nextComments) {
    const signature = buildCommentSignature(comment);
    nextCounts.set(signature, (nextCounts.get(signature) ?? 0) + 1);
  }

  return previousComments.filter((comment) => {
    const signature = buildCommentSignature(comment);
    const remaining = nextCounts.get(signature) ?? 0;

    if (remaining === 0) {
      return true;
    }

    nextCounts.set(signature, remaining - 1);
    return false;
  });
};

const getSheetItemKey = (ageGroup: string, level: number) =>
  `${ageGroup}-${level}`;

export const getSheetCommentRestoreTargets = (
  previousSheet: ExerciseSheetQuery["exerciseSheet"] | null | undefined,
  nextSheet: ExerciseSheetQuery["exerciseSheet"] | null | undefined,
  items: ComposeItems,
) => {
  const targets: SheetCommentRestoreTarget[] = [];
  let skippedCommentCount = 0;

  if (!previousSheet || !nextSheet) {
    return { skippedCommentCount, targets };
  }

  const nextSheetItemsByKey = new Map(
    nextSheet.sheetItems.map((item) => [
      getSheetItemKey(item.ageGroup, item.level),
      item,
    ]),
  );

  const previousOrderedCommentsById = new Map<
    string,
    ExerciseSheetCommentFragment[]
  >();

  for (const item of previousSheet.sheetItems) {
    const key = getSheetItemKey(item.ageGroup, item.level);
    const nextSheetItem = nextSheetItemsByKey.get(key);

    if (!nextSheetItem) {
      skippedCommentCount += item.comments.length;
    } else {
      const missingCategoryComments = getMissingComments(
        item.comments,
        nextSheetItem.comments,
      );

      targets.push(
        ...missingCategoryComments.map((comment) => ({
          comment,
          targetId: nextSheetItem.id,
          targetType: "SheetItem" as const,
        })),
      );
    }

    for (const exercise of item.exercises) {
      if (exercise.id) {
        previousOrderedCommentsById.set(exercise.id, exercise.comments);
      }
    }
  }

  for (const [containerKey, containerItems] of Object.entries(items)) {
    if (containerKey === "talon") {
      continue;
    }

    const nextSheetItem = nextSheetItemsByKey.get(containerKey);
    if (!nextSheetItem) {
      continue;
    }

    for (const [order, item] of containerItems.entries()) {
      const previousComments =
        previousOrderedCommentsById.get(item.cardId) ?? [];

      if (previousComments.length === 0 || item.id === null) {
        continue;
      }

      const nextOrderedExercise = nextSheetItem.exercises.find(
        (exercise) =>
          exercise.order === order && exercise.exercise.id === String(item.id),
      );

      if (!nextOrderedExercise?.id) {
        skippedCommentCount += previousComments.length;
        continue;
      }

      const missingOrderedComments = getMissingComments(
        previousComments,
        nextOrderedExercise.comments,
      );

      targets.push(
        ...missingOrderedComments.map((comment) => ({
          comment,
          targetId: nextOrderedExercise.id!,
          targetType: "OrderedExercise" as const,
        })),
      );
    }
  }

  return { skippedCommentCount, targets };
};
