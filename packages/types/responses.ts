import { z } from "zod";

import { ZPerson, ZPersonAttributes } from "./people";
import { ZSurvey, ZSurveyLogicCondition } from "./surveys";
import { ZTag } from "./tags";

export const ZResponseData = z.record(z.union([z.string(), z.number(), z.array(z.string())]));

export type TResponseData = z.infer<typeof ZResponseData>;

export const ZResponseTtc = z.record(z.number());

export type TResponseTtc = z.infer<typeof ZResponseTtc>;

export const ZResponsePersonAttributes = ZPersonAttributes.nullable();

export type TResponsePersonAttributes = z.infer<typeof ZResponsePersonAttributes>;

export const ZSurveyPersonAttributes = z.record(z.array(z.string()));

export type TSurveyPersonAttributes = z.infer<typeof ZSurveyPersonAttributes>;

const ZResponseFilterCriteriaDataLessThan = z.object({
  op: z.literal(ZSurveyLogicCondition.Values.lessThan),
  value: z.number(),
});

const ZResponseFilterCriteriaDataLessEqual = z.object({
  op: z.literal(ZSurveyLogicCondition.Values.lessEqual),
  value: z.number(),
});

const ZResponseFilterCriteriaDataGreaterEqual = z.object({
  op: z.literal(ZSurveyLogicCondition.Values.greaterEqual),
  value: z.number(),
});

const ZResponseFilterCriteriaDataGreaterThan = z.object({
  op: z.literal(ZSurveyLogicCondition.Values.greaterThan),
  value: z.number(),
});

const ZResponseFilterCriteriaDataIncludesOne = z.object({
  op: z.literal(ZSurveyLogicCondition.Values.includesOne),
  value: z.array(z.string()),
});

const ZResponseFilterCriteriaDataIncludesAll = z.object({
  op: z.literal(ZSurveyLogicCondition.Values.includesAll),
  value: z.array(z.string()),
});

const ZResponseFilterCriteriaDataEquals = z.object({
  op: z.literal(ZSurveyLogicCondition.Values.equals),
  value: z.union([z.string(), z.number()]),
});

const ZResponseFilterCriteriaDataNotEquals = z.object({
  op: z.literal(ZSurveyLogicCondition.Values.notEquals),
  value: z.union([z.string(), z.number()]),
});

const ZResponseFilterCriteriaDataAccepted = z.object({
  op: z.literal(ZSurveyLogicCondition.Values.accepted),
});

const ZResponseFilterCriteriaDataClicked = z.object({
  op: z.literal(ZSurveyLogicCondition.Values.clicked),
});

const ZResponseFilterCriteriaDataSubmitted = z.object({
  op: z.literal(ZSurveyLogicCondition.Values.submitted),
});

const ZResponseFilterCriteriaDataSkipped = z.object({
  op: z.literal(ZSurveyLogicCondition.Values.skipped),
});

const ZResponseFilterCriteriaDataUploaded = z.object({
  op: z.literal(ZSurveyLogicCondition.Values.uploaded),
});

const ZResponseFilterCriteriaDataNotUploaded = z.object({
  op: z.literal(ZSurveyLogicCondition.Values.notUploaded),
});

const ZResponseFilterCriteriaDataBooked = z.object({
  op: z.literal(ZSurveyLogicCondition.Values.booked),
});

export const ZResponseFilterCriteria = z.object({
  finished: z.boolean().optional(),
  createdAt: z
    .object({
      min: z.date().optional(),
      max: z.date().optional(),
    })
    .optional(),

  personAttributes: z
    .record(
      z.object({
        op: z.enum(["equals", "notEquals"]),
        value: z.union([z.string(), z.number()]),
      })
    )
    .optional(),

  data: z
    .record(
      z.union([
        ZResponseFilterCriteriaDataLessThan,
        ZResponseFilterCriteriaDataLessEqual,
        ZResponseFilterCriteriaDataGreaterEqual,
        ZResponseFilterCriteriaDataGreaterThan,
        ZResponseFilterCriteriaDataIncludesOne,
        ZResponseFilterCriteriaDataIncludesAll,
        ZResponseFilterCriteriaDataEquals,
        ZResponseFilterCriteriaDataNotEquals,
        ZResponseFilterCriteriaDataAccepted,
        ZResponseFilterCriteriaDataClicked,
        ZResponseFilterCriteriaDataSubmitted,
        ZResponseFilterCriteriaDataSkipped,
        ZResponseFilterCriteriaDataUploaded,
        ZResponseFilterCriteriaDataNotUploaded,
        ZResponseFilterCriteriaDataBooked,
      ])
    )
    .optional(),

  tags: z
    .object({
      applied: z.array(z.string()).optional(),
      notApplied: z.array(z.string()).optional(),
    })
    .optional(),
});

export type TResponseFilterCriteria = z.infer<typeof ZResponseFilterCriteria>;

export const ZResponseNoteUser = z.object({
  id: z.string().cuid2(),
  name: z.string().nullable(),
});

export type TResponseNoteUser = z.infer<typeof ZResponseNoteUser>;

export const ZResponseNote = z.object({
  updatedAt: z.date(),
  createdAt: z.date(),
  id: z.string(),
  text: z.string(),
  user: ZResponseNoteUser,
  isResolved: z.boolean(),
  isEdited: z.boolean(),
});

export type TResponseNote = z.infer<typeof ZResponseNote>;

export const ZResponseMeta = z.object({
  source: z.string().optional(),
  url: z.string().optional(),
  userAgent: z
    .object({
      browser: z.string().optional(),
      os: z.string().optional(),
      device: z.string().optional(),
    })
    .optional(),
  country: z.string().optional(),
});

export type TResponseMeta = z.infer<typeof ZResponseMeta>;

export const ZResponse = z.object({
  id: z.string().cuid2(),
  createdAt: z.date(),
  updatedAt: z.date(),
  surveyId: z.string().cuid2(),
  person: ZPerson.nullable(),
  personAttributes: ZResponsePersonAttributes,
  finished: z.boolean(),
  data: ZResponseData,
  ttc: ZResponseTtc.optional(),
  notes: z.array(ZResponseNote),
  tags: z.array(ZTag),
  meta: ZResponseMeta.nullable(),
  singleUseId: z.string().nullable(),
});

export type TResponse = z.infer<typeof ZResponse>;

export const ZResponseInput = z.object({
  environmentId: z.string().cuid2(),
  surveyId: z.string().cuid2(),
  userId: z.string().nullish(),
  singleUseId: z.string().nullable().optional(),
  finished: z.boolean(),
  data: ZResponseData,
  ttc: ZResponseTtc.optional(),
  meta: z
    .object({
      source: z.string().optional(),
      url: z.string().optional(),
      userAgent: z
        .object({
          browser: z.string().optional(),
          device: z.string().optional(),
          os: z.string().optional(),
        })
        .optional(),
      country: z.string().optional(),
    })
    .optional(),
});

export type TResponseInput = z.infer<typeof ZResponseInput>;

export const ZResponseLegacyInput = ZResponseInput.omit({ userId: true, environmentId: true }).extend({
  personId: z.string().cuid2().nullable(),
});

export type TResponseLegacyInput = z.infer<typeof ZResponseLegacyInput>;

export const ZResponseUpdateInput = z.object({
  finished: z.boolean(),
  data: ZResponseData,
  ttc: ZResponseTtc.optional(),
});

export type TResponseUpdateInput = z.infer<typeof ZResponseUpdateInput>;

export const ZResponseWithSurvey = ZResponse.extend({
  survey: ZSurvey,
});

export type TResponseWithSurvey = z.infer<typeof ZResponseWithSurvey>;

export const ZResponseUpdate = z.object({
  finished: z.boolean(),
  data: ZResponseData,
  ttc: ZResponseTtc.optional(),
  meta: z
    .object({
      url: z.string().optional(),
      source: z.string().optional(),
    })
    .optional(),
});

export type TResponseUpdate = z.infer<typeof ZResponseUpdate>;
