/**
 * Religion Designer data model
 * ----------------------------
 * This file defines the standalone data model that underpins the app.
 * It captures entities, fields, enumerations, and convenience templates so the
 * UI can rely on a well-known schema when reading or writing religion data.
 *
 * The model follows three layers:
 * 1) Scriptural Layer (texts, claims, corpora)
 * 2) Mythic/Cosmic Layer (entities, norms, practices, cosmology)
 * 3) Profile Layer (comparative axes derived from claims)
 *
 * Key design choices from the spec:
 * - Text clusters and origin claims live on TextWork only (not TextUnit).
 * - Liturgical usage links to calendar events instead of a standalone flag.
 * - Ritual density contribution is removed in favor of the profile axis.
 * - Calendar entities capture ritual time (events) separately from cosmic time.
 */

// ---- Enumerations ---------------------------------------------------------

const enums = {
  TextUnitType: [
    'WORK',
    'BOOK',
    'SCROLL',
    'TABLET',
    'CHAPTER',
    'SECTION',
    'SUTRA',
    'VERSE',
    'LINE',
    'HYMN',
    'SPELL',
    'ORACLE',
    'OTHER'
  ],

  TextFunctionType: [
    'LAW_NORM_INSTITUTION',
    'MYTH_STORY_MEMORY',
    'PHILOSOPHY_ETHICS',
    'MYSTICAL_ESOTERIC_TECH',
    'COMMENTARIAL_JURISPRUDENTIAL',
    'LITURGICAL_RITUAL_SCRIPT',
    'NEW_REVELATION_CHANNELING',
    'IDENTITY_MANIFESTO_SATIRE',
    'OTHER'
  ],

  OriginClaimType: [
    'DIRECT_REVELATION',
    'INSPIRED_HUMAN_AUTHOR',
    'ENLIGHTENED_INSIGHT',
    'COMMUNITY_ACCUMULATION',
    'MIXED_OR_UNSPECIFIED'
  ],

  TextClusterType: [
    'CONSTITUTIONAL_REVELATION',
    'EPIC_MYTHIC_STORYWORLD',
    'PHILOSOPHICAL_WISDOM_MANUAL',
    'MYSTICAL_ESOTERIC_MAP_AND_METHOD',
    'COMMENTARIAL_JURISPRUDENTIAL',
    'NEW_REVELATION_CHANNELED',
    'LITURGICAL_RITUAL_ATLAS',
    'IDENTITY_MEMORY_QUASI_SCRIPTURAL'
  ],

  CanonStructureType: [
    'TIGHT_CLOSED_CANON',
    'GROWING_OPEN_CANON',
    'LIBRARY_WITH_COMMENTARIAL_STACK',
    'ORAL_CENTRIC_TEXT_AS_AIDE_MEMOIRE'
  ],

  CanonOpennessType: ['CLOSED', 'SOFTLY_OPEN', 'OPEN'],

  CanonRoleType: [
    'CORE_CANON',
    'DEUTEROCANONICAL',
    'APOCRYPHAL',
    'COMMENTARIAL',
    'LITURGICAL_ONLY',
    'NONCANONICAL_BUT_INFLUENTIAL',
    'OTHER'
  ],

  TheisticOrientation: [
    'NON_THEISTIC',
    'MONOTHEISTIC',
    'POLYTHEISTIC',
    'HENOTHEISTIC',
    'PANTHEISTIC',
    'PANENTHEISTIC',
    'AGNOSTIC_OR_UNDEFINED'
  ],

  UltimatePersonality: ['PERSONAL', 'MIXED', 'IMPERSONAL'],

  TranscendenceImmanence: [
    'RADICALLY_TRANSCENDENT',
    'TRANSCENDENT_AND_IMMANENT',
    'STRONGLY_IMMANENT'
  ],

  UnityMultiplicity: ['STRICT_UNITY', 'QUALIFIED_UNITY', 'PLURAL'],

  DualismType: [
    'STRONG_DUALISM',
    'SOFT_DUALISM',
    'NON_DUAL',
    'PLURALIST_NO_CENTRAL_DUALISM'
  ],

  SacredWorldRelation: [
    'CREATOR_CREATION_SEPARATION',
    'EMANATION',
    'IDENTITY',
    'NOT_EMPHASIZED'
  ],

  BeingHierarchyType: ['FLAT', 'LAYERED', 'HIGHLY_STRATIFIED'],

  TimeStructure: ['LINEAR', 'CYCLICAL', 'SPIRAL_OR_LAYERED', 'ATEMPORAL_MYSTICAL_NOW_DOMINANT'],

  CosmologyOriginType: [
    'CREATED_EX_NIHILO',
    'SHAPED_FROM_PRE_EXISTENT',
    'EMERGENT_OR_SPONTANEOUS',
    'ETERNAL_NO_ORIGIN_STORY'
  ],

  EschatologyType: [
    'FINAL_JUDGMENT_END_OF_HISTORY',
    'CYCLIC_DESTRUCTION_RENEWAL',
    'GRADUAL_TRANSFORMATION',
    'NO_CENTRAL_ESCHATOLOGY'
  ],

  SacredSpaceCentralization: [
    'SINGLE_CENTER',
    'MULTIPLE_KEY_SITES',
    'DIFFUSE_EVERYWHERE_POTENTIALLY_SACRED'
  ],

  TerritorialityType: ['STRONGLY_TERRITORY_BOUND', 'MIXED', 'HIGHLY_PORTABLE'],

  HumanNatureView: [
    'BASICALLY_GOOD_OR_DIVINE_SPARK',
    'MIXED_AMBIVALENT',
    'FALLEN_OR_DEEPLY_FLAWED'
  ],

  PrimaryProblemType: [
    'SIN_GUILT_DISOBEDIENCE',
    'IGNORANCE_DELUSION',
    'SUFFERING_ATTACHMENT',
    'IMPURITY_POLLUTION',
    'DISHARMONY_SOCIAL_BREAKDOWN',
    'OPPRESSION_INJUSTICE',
    'MEANINGLESSNESS_ALIENATION'
  ],

  PrimaryGoalType: [
    'SALVATION_HEAVEN_RECONCILIATION',
    'ENLIGHTENMENT_LIBERATION',
    'HARMONY_BALANCE',
    'PROSPERITY_PROTECTION_WELL_BEING',
    'DEIFICATION',
    'FLOURISHING_NO_STRONG_SOTERIOLOGY'
  ],

  ScopeOfTransformation: ['INDIVIDUAL', 'COMMUNAL', 'COSMIC'],

  AfterlifeModel: [
    'RESURRECTION',
    'REINCARNATION_REBIRTH',
    'ANCESTRAL_WORLD',
    'DISSOLUTION_INTO_ULTIMATE',
    'NO_STRONG_AFTERLIFE_DOCTRINE'
  ],

  RitualDensity: ['MINIMAL', 'MODERATE', 'RITUAL_SATURATED'],

  OrthodoxyOrthopraxy: ['BELIEF_CENTERED', 'BALANCED', 'PRACTICE_CENTERED'],

  AsceticismType: ['STRONGLY_ASCETIC', 'MIXED', 'WORLD_AFFIRMING'],

  MysticalEmphasis: ['LOW', 'OPTIONAL', 'CENTRAL'],

  LifeIntegration: ['COMPARTMENTALIZED', 'HIGH_OVERLAP', 'TOTAL_WAY_OF_LIFE'],

  TransformationTechniqueType: [
    'PRAYER',
    'MEDITATION_CONTEMPLATION',
    'SACRIFICE_OFFERING',
    'DEVOTIONAL_WORSHIP',
    'MAGIC_RITUAL_MANIPULATION',
    'SERVICE_ACTIVISM',
    'STUDY_INTERPRETATION'
  ],

  ScripturalityLevel: [
    'NO_CENTRAL_SCRIPTURE',
    'SCRIPTURE_PRESENT_NOT_EXCLUSIVE',
    'SCRIPTURE_ABSOLUTE_AND_CENTRAL'
  ],

  ExotericEsotericBalance: ['MAINLY_EXOTERIC', 'TWO_LEVEL', 'STRONGLY_ESOTERIC'],

  ReasonScienceAttitude: [
    'SUSPICIOUS_OR_HOSTILE',
    'INTEGRATIVE_BUT_BOUNDED',
    'HIGHLY_AFFIRMING'
  ],

  UniversalizingLevel: [
    'STRONGLY_UNIVERSALIZING',
    'MIXED',
    'ETHNIC_OR_PLACE_BOUND'
  ],

  ConversionPattern: [
    'ACTIVELY_MISSIONARY',
    'OPEN_BUT_NOT_SEEKING',
    'DISCOURAGES_OR_CLOSED'
  ],

  ExclusivismInclusivism: [
    'EXCLUSIVIST',
    'INCLUSIVIST',
    'PLURALIST',
    'LOOSE_RELATIVIST'
  ],

  InstitutionCentralization: [
    'STRONGLY_CENTRALIZED',
    'FEDERATED',
    'HIGHLY_DECENTRALIZED'
  ],

  ClergyStructure: [
    'NO_DISTINCT_CLERGY',
    'SOFT_DIFFERENTIATION',
    'STRONGLY_STRATIFIED_CLERGY_LAITY'
  ],

  PoliticalRelation: [
    'THEOCRATIC_OR_STATE_RELIGION',
    'STATE_LINKED_SEMI_AUTONOMOUS',
    'SEPARATIONIST_OR_PRIVATIZED',
    'SUBVERSIVE_OR_OPPOSITIONAL',
    'INTENTIONALLY_APOLITICAL'
  ],

  GenderNorms: [
    'STRONGLY_PATRIARCHAL_FIXED_ROLES',
    'MODERATE',
    'EGALITARIAN_QUEER_AFFIRMING_FLUID'
  ],

  Iconicity: ['STRONGLY_ICONIC', 'MIXED', 'ANICONIC_OR_ICONOCLASTIC'],

  AestheticIntensity: ['MINIMALISTIC', 'MODERATE', 'HIGHLY_AESTHETICIZED'],

  ArtsEmphasis: ['LOW', 'MODERATE', 'HIGH'],

  EmotionRegister: [
    'AWE_FEAR',
    'LOVE_COMPASSION',
    'SERENITY_DETACHMENT',
    'ECSTASY_POSSESSION',
    'JOY_CELEBRATION',
    'CONTRITION_REPENTANCE'
  ],

  OriginPattern: ['SINGLE_FOUNDER', 'DIFFUSE_TRIBAL_ANCESTRAL'],

  SelfUnderstandingContinuity: [
    'PRIMORDIAL_ORIGINAL_WAY',
    'FULFILLS_OR_REFORMS_EARLIER_WAYS',
    'NEW_REVELATION_OR_EXPERIMENT'
  ],

  SyncretismTolerance: [
    'PURIST_ANTI_SYNCRETIC',
    'MODERATELY_TOLERANT',
    'HIGHLY_SYNCRETIC'
  ],

  MythHistoricization: [
    'MYTH_AS_LITERAL_HISTORY',
    'LAYERED_LITERAL_AND_SYMBOLIC',
    'PRIMARILY_SYMBOLIC'
  ],

  SacredEntityType: [
    'DEITY',
    'SPIRIT',
    'ANGEL',
    'DEMON',
    'HUMAN_FIGURE',
    'ANCESTOR',
    'REALM',
    'PLACE',
    'OBJECT',
    'PRINCIPLE',
    'LAW',
    'COLLECTIVE',
    'OTHER'
  ],

  SacredRelationType: [
    'PARENT_OF',
    'CHILD_OF',
    'SPOUSE_OF',
    'ENEMY_OF',
    'ALLY_OF',
    'CREATOR_OF',
    'CREATED_BY',
    'RULER_OF',
    'RESIDES_IN',
    'MANIFESTATION_OF',
    'SERVES',
    'OTHER'
  ],

  CosmologyStructureType: ['LAYERED', 'WHEEL', 'TREE', 'FLAT', 'GRID', 'OTHER'],

  NormType: ['COMMAND', 'PROHIBITION', 'IDEAL', 'PROCEDURE', 'TABOO', 'PERMISSION', 'RECOMMENDATION'],

  NormTargetType: ['INDIVIDUAL', 'GROUP', 'CLERGY', 'RULERS', 'WHOLE_COMMUNITY', 'COSMIC_BEING', 'OTHER'],

  NormDomainType: [
    'ETHICAL',
    'RITUAL',
    'DIETARY',
    'SEXUAL',
    'ECONOMIC',
    'POLITICAL',
    'PURITY',
    'DOCTRINAL',
    'MONASTIC_RULE',
    'OTHER'
  ],

  PracticeType: [
    'RITUAL_SACRIFICE_OFFERING',
    'LITURGICAL_WORSHIP',
    'PRAYER_DEVOTION',
    'MEDITATION_YOGA',
    'ASCETIC_PRACTICE',
    'DIVINATION_OR_ORACLE',
    'PILGRIMAGE',
    'MAGIC_SORCERY',
    'SERVICE_ALMSGIVING',
    'STUDY_RECITATION',
    'OTHER'
  ],

  ClaimType: [
    'METAPHYSICAL',
    'COSMOLOGICAL',
    'HISTORICAL',
    'NORMATIVE',
    'RITUAL',
    'SOTERIOLOGICAL',
    'HERMENEUTIC',
    'IDENTITY',
    'OTHER'
  ],

  CalendarRecurrenceType: [
    'FIXED_SOLAR_DATE',
    'LUNAR_MONTH_DAY',
    'NTH_WEEKDAY_OF_MONTH',
    'SEASONAL_PERIOD',
    'WEEKLY_DAY',
    'ONE_OFF',
    'OTHER'
  ]
};

// ---- Entities ------------------------------------------------------------

const entities = {
  ReligionSystem: {
    description: 'Broad religious system such as Roman Catholicism or Ifá.',
    fields: {
      id: 'ID',
      name: 'string',
      short_name: 'string',
      description: 'text',
      parent_system_id: 'ID | null',
      origin_period: 'string | null',
      origin_region: 'string | null',
      has_corpora: ['ScripturalCorpus.id'],
      profiles: ['ReligionProfile.id']
    }
  },

  ScripturalCorpus: {
    description: 'Collection treated as scripture or quasi-scripture.',
    fields: {
      id: 'ID',
      name: 'string',
      tradition_id: 'ReligionSystem.id',
      description: 'text',
      canon_structure: 'CanonStructureType',
      canon_openness: 'CanonOpennessType',
      primary_medium: 'enum[TEXT, ORAL, MIXED]',
      works: ['TextWork.id']
    }
  },

  TextWork: {
    description: 'Named work or book such as Genesis or Kojiki.',
    fields: {
      id: 'ID',
      title: 'string',
      alt_titles: ['string'],
      corpus_ids: ['ScripturalCorpus.id'],
      attributed_authors: ['Person.id'],
      composition_period: 'string | null',
      composition_region: 'string | null',
      origin_claims: ['OriginClaimType'],
      text_clusters: ['TextClusterType'],
      primary_functions: ['TextFunctionType'],
      canonical_role: 'CanonRoleType',
      structure_root_unit_id: 'TextUnit.id | null',
      primary_functions_note: 'text | null'
    }
  },

  TextUnit: {
    description: 'Hierarchical node within a text (chapter, verse, hymn, etc.).',
    fields: {
      id: 'ID',
      work_id: 'TextWork.id',
      unit_type: 'TextUnitType',
      label: 'string',
      sequence_in_parent: 'int',
      parent_unit_id: 'TextUnit.id | null',
      content: 'text | null',
      language: 'string | null',
      notes: 'text | null',
      functions: ['TextFunctionType'],
      liturgical_uses: ['LiturgicalUse.id'],
      referenced_entities: ['SacredEntity.id'],
      referenced_claims: ['Claim.id']
    }
  },

  Person: {
    description: 'Historical or mythic person relevant to authorship or founding.',
    fields: {
      id: 'ID',
      name: 'string',
      is_mythic: 'boolean',
      notes: 'text | null'
    }
  },

  ReligiousCalendar: {
    description: 'Ritual calendar scoped to a tradition or region.',
    fields: {
      id: 'ID',
      tradition_id: 'ReligionSystem.id',
      name: 'string',
      description: 'text',
      region_scope: 'string | null',
      events: ['CalendarEvent.id']
    }
  },

  CalendarEvent: {
    description: 'Recurring ritual or liturgical event (Ramadan, Easter, Sabbath).',
    fields: {
      id: 'ID',
      calendar_id: 'ReligiousCalendar.id',
      name: 'string',
      description: 'text',
      recurrence_type: 'CalendarRecurrenceType',
      recurrence_rule: 'json | text',
      linked_practices: ['Practice.id'],
      linked_texts: ['TextUnit.id'],
      linked_entities: ['SacredEntity.id']
    }
  },

  LiturgicalUse: {
    description: 'Usage of a text unit in ritual context.',
    fields: {
      id: 'ID',
      text_unit_id: 'TextUnit.id',
      calendar_event_id: 'CalendarEvent.id | null',
      performance_mode: 'enum[CHANT, RECITATION, SONG, PROCESSION, DRAMA, SILENT_READING]'
    }
  },

  SacredEntity: {
    description: 'Beings, realms, objects, or principles in the cosmology.',
    fields: {
      id: 'ID',
      name: 'string',
      entity_type: 'SacredEntityType',
      tradition_id: 'ReligionSystem.id | null',
      description: 'text',
      is_ultimate_reality: 'boolean',
      is_personal: 'boolean | null',
      related_entities: ['RelationEdge.id'],
      defining_claims: ['Claim.id']
    }
  },

  RelationEdge: {
    description: 'Relation between sacred entities.',
    fields: {
      id: 'ID',
      from_entity_id: 'SacredEntity.id',
      to_entity_id: 'SacredEntity.id',
      relation_type: 'SacredRelationType',
      supported_by_claims: ['Claim.id']
    }
  },

  CosmologicalStructure: {
    description: 'High-level cosmology such as layered heavens or wheel model.',
    fields: {
      id: 'ID',
      tradition_id: 'ReligionSystem.id',
      name: 'string',
      description: 'text',
      realms: ['SacredEntity.id'],
      structure_type: 'CosmologyStructureType',
      supported_by_claims: ['Claim.id']
    }
  },

  Norm: {
    description: 'Norms, laws, prohibitions, or ideals anchored in text claims.',
    fields: {
      id: 'ID',
      tradition_id: 'ReligionSystem.id',
      label: 'string',
      norm_type: 'NormType',
      target: 'NormTargetType',
      domain: 'NormDomainType',
      conditions: 'text | null',
      consequences: 'text | null',
      supported_by_claims: ['Claim.id']
    }
  },

  Practice: {
    description: 'Rituals, devotions, techniques, divinations, pilgrimages.',
    fields: {
      id: 'ID',
      tradition_id: 'ReligionSystem.id',
      name: 'string',
      practice_type: 'PracticeType',
      description: 'text',
      frequency: 'enum[ONCE, DAILY, WEEKLY, ANNUAL, LIFE_EVENT, AS_NEEDED]',
      required_or_optional: 'enum[REQUIRED, STRONGLY_ENCOURAGED, OPTIONAL, SPECIALIST_ONLY]',
      involved_entities: ['SacredEntity.id'],
      linked_calendar_events: ['CalendarEvent.id'],
      supported_by_claims: ['Claim.id']
    }
  },

  Claim: {
    description: 'Atomic statement extracted from scripture or commentary.',
    fields: {
      id: 'ID',
      tradition_id: 'ReligionSystem.id | null',
      claim_type: 'ClaimType',
      content: 'text',
      formal_representation: 'json | null',
      source_units: ['TextUnit.id'],
      interpreted_by: ['InterpretiveNote.id']
    }
  },

  InterpretiveNote: {
    description: 'Commentary or interpretation tied to claims and text units.',
    fields: {
      id: 'ID',
      author: 'string | null',
      community_context: 'string | null',
      content: 'text',
      source_units: ['TextUnit.id']
    }
  },

  ReligionProfile: {
    description: 'Snapshot profile of a tradition for a time/region scope.',
    fields: {
      id: 'ID',
      tradition_id: 'ReligionSystem.id',
      label: 'string',
      time_scope: 'string | null',
      region_scope: 'string | null',
      profile_settings: ['ProfileSetting.id'],
      metaphysics: 'MetaphysicsProfile',
      cosmos: 'CosmosProfile',
      human: 'HumanProfile',
      practice: 'PracticeProfile',
      authority: 'AuthorityProfile',
      community: 'CommunityProfile',
      aesthetics: 'AestheticsProfile',
      historical: 'HistoricalProfile'
    }
  },

  ProfileSetting: {
    description: 'Axis-value selection backed by claims.',
    fields: {
      id: 'ID',
      profile_id: 'ReligionProfile.id',
      axis: 'string',
      value: 'string',
      weight: 'float | null',
      supported_by_claims: ['Claim.id'],
      notes: 'text | null'
    }
  }
};

// ---- Profile Bundles -----------------------------------------------------

const profiles = {
  MetaphysicsProfile: {
    theistic_orientation: 'TheisticOrientation',
    ultimate_personality: 'UltimatePersonality',
    transcendence_immanence: 'TranscendenceImmanence',
    unity_multiplicity: 'UnityMultiplicity',
    dualism_type: 'DualismType',
    sacred_world_relation: 'SacredWorldRelation',
    hierarchy_of_beings: 'BeingHierarchyType'
  },
  CosmosProfile: {
    time_structure: 'TimeStructure',
    cosmology_origin: 'CosmologyOriginType',
    eschatology_type: 'EschatologyType',
    sacred_space_centralization: 'SacredSpaceCentralization',
    sacred_space_territoriality: 'TerritorialityType'
  },
  HumanProfile: {
    view_of_human_nature: 'HumanNatureView',
    primary_problems: ['PrimaryProblemType'],
    primary_goals: ['PrimaryGoalType'],
    scope_of_transformation: 'ScopeOfTransformation',
    afterlife_models: ['AfterlifeModel']
  },
  PracticeProfile: {
    ritual_density: 'RitualDensity',
    orthodoxy_vs_orthopraxy: 'OrthodoxyOrthopraxy',
    ascetic_world_affirming: 'AsceticismType',
    mystical_emphasis: 'MysticalEmphasis',
    ordinary_life_integration: 'LifeIntegration',
    main_techniques_of_transformation: ['TransformationTechniqueType']
  },
  AuthorityProfile: {
    authority_weights: {
      scripture: 'float',
      oral_tradition: 'float',
      institutional_hierarchy: 'float',
      charismatic_leader: 'float',
      personal_experience: 'float',
      reason_philosophy: 'float'
    },
    scripturality_level: 'ScripturalityLevel',
    canon_openness: 'CanonOpennessType',
    exoteric_esoteric_balance: 'ExotericEsotericBalance',
    reason_science_attitude: 'ReasonScienceAttitude'
  },
  CommunityProfile: {
    universalizing_level: 'UniversalizingLevel',
    conversion_pattern: 'ConversionPattern',
    stance_toward_others: 'ExclusivismInclusivism',
    institutional_centralization: 'InstitutionCentralization',
    clergy_structure: 'ClergyStructure',
    relation_to_political_power: 'PoliticalRelation',
    gender_family_norms: 'GenderNorms'
  },
  AestheticsProfile: {
    iconic_vs_aniconic: 'Iconicity',
    aesthetic_intensity: 'AestheticIntensity',
    music_emphasis: 'ArtsEmphasis',
    dance_emphasis: 'ArtsEmphasis',
    drama_emphasis: 'ArtsEmphasis',
    dominant_emotional_registers: ['EmotionRegister']
  },
  HistoricalProfile: {
    origin_pattern: 'OriginPattern',
    self_understanding: 'SelfUnderstandingContinuity',
    syncretism_tolerance: 'SyncretismTolerance',
    myth_historicization: 'MythHistoricization'
  }
};

// ---- Templates -----------------------------------------------------------

const templates = {
  createReligionSystem() {
    return {
      id: null,
      name: '',
      short_name: '',
      description: '',
      parent_system_id: null,
      origin_period: null,
      origin_region: null,
      has_corpora: [],
      profiles: []
    };
  },
  createScripturalCorpus() {
    return {
      id: null,
      name: '',
      tradition_id: null,
      description: '',
      canon_structure: enums.CanonStructureType[0],
      canon_openness: enums.CanonOpennessType[0],
      primary_medium: 'TEXT',
      works: []
    };
  },
  createTextWork() {
    return {
      id: null,
      title: '',
      alt_titles: [],
      corpus_ids: [],
      attributed_authors: [],
      composition_period: null,
      composition_region: null,
      origin_claims: [],
      text_clusters: [],
      primary_functions: [],
      canonical_role: enums.CanonRoleType[0],
      structure_root_unit_id: null,
      primary_functions_note: ''
    };
  },
  createTextUnit() {
    return {
      id: null,
      work_id: null,
      unit_type: enums.TextUnitType[0],
      label: '',
      sequence_in_parent: 0,
      parent_unit_id: null,
      content: null,
      language: null,
      notes: null,
      functions: [],
      liturgical_uses: [],
      referenced_entities: [],
      referenced_claims: []
    };
  },
  createReligionProfile() {
    return {
      id: null,
      tradition_id: null,
      label: '',
      time_scope: null,
      region_scope: null,
      profile_settings: [],
      metaphysics: {},
      cosmos: {},
      human: {},
      practice: {},
      authority: {},
      community: {},
      aesthetics: {},
      historical: {}
    };
  }
};

// Expose the model for future UI wiring.
const ReligionDataModel = { enums, entities, profiles, templates };

if (typeof window !== 'undefined') {
  window.ReligionDataModel = ReligionDataModel;
}

// Support module import when bundling.
if (typeof module !== 'undefined') {
  module.exports = ReligionDataModel;
}
