--
-- PostgreSQL database dump
--

\restrict 6iSOZgb36u2aZ4P6lZtfZfbTG75dj5J0o2gq47omMCGIjwacZWjYbvyIRgcabM8

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-09-02 19:09:14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 16569)
-- Name: blockchain_records; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.blockchain_records (
    id integer NOT NULL,
    project_id integer,
    carbon_credits numeric(12,2) NOT NULL,
    contract_address character varying(42) NOT NULL,
    transaction_hash character varying(66) NOT NULL,
    blockchain_status character varying(50) DEFAULT 'Confirmed'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.blockchain_records OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16568)
-- Name: blockchain_records_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.blockchain_records_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.blockchain_records_id_seq OWNER TO postgres;

--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 225
-- Name: blockchain_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.blockchain_records_id_seq OWNED BY public.blockchain_records.id;


--
-- TOC entry 224 (class 1259 OID 16551)
-- Name: evidence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.evidence (
    id integer NOT NULL,
    project_id integer,
    evidence_type character varying(100) NOT NULL,
    file_reference character varying(255) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    file_name character varying(255),
    file_type character varying(100),
    file_path text
);


ALTER TABLE public.evidence OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16550)
-- Name: evidence_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.evidence_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.evidence_id_seq OWNER TO postgres;

--
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 223
-- Name: evidence_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.evidence_id_seq OWNED BY public.evidence.id;


--
-- TOC entry 222 (class 1259 OID 16531)
-- Name: mrv_records; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mrv_records (
    id integer NOT NULL,
    project_id integer,
    monitoring_date date NOT NULL,
    carbon_stock numeric(12,2) NOT NULL,
    estimated_credits numeric(12,2) NOT NULL,
    notes text,
    verification_status character varying(50) DEFAULT 'Pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.mrv_records OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16530)
-- Name: mrv_records_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mrv_records_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mrv_records_id_seq OWNER TO postgres;

--
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 221
-- Name: mrv_records_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mrv_records_id_seq OWNED BY public.mrv_records.id;


--
-- TOC entry 220 (class 1259 OID 16513)
-- Name: projects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    location character varying(255) NOT NULL,
    ecosystem character varying(50) NOT NULL,
    area numeric(10,2) NOT NULL,
    start_date date NOT NULL,
    description text,
    owner character varying(255) NOT NULL,
    status character varying(50) DEFAULT 'Pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.projects OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16512)
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.projects_id_seq OWNER TO postgres;

--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 219
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- TOC entry 4879 (class 2604 OID 16572)
-- Name: blockchain_records id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blockchain_records ALTER COLUMN id SET DEFAULT nextval('public.blockchain_records_id_seq'::regclass);


--
-- TOC entry 4877 (class 2604 OID 16554)
-- Name: evidence id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evidence ALTER COLUMN id SET DEFAULT nextval('public.evidence_id_seq'::regclass);


--
-- TOC entry 4874 (class 2604 OID 16534)
-- Name: mrv_records id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mrv_records ALTER COLUMN id SET DEFAULT nextval('public.mrv_records_id_seq'::regclass);


--
-- TOC entry 4871 (class 2604 OID 16516)
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- TOC entry 5047 (class 0 OID 16569)
-- Dependencies: 226
-- Data for Name: blockchain_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.blockchain_records (id, project_id, carbon_credits, contract_address, transaction_hash, blockchain_status, created_at) FROM stdin;
1	1	2840.00	0x5FC8d32690cc91D4c39d9d3abcBD16989F875707	0x8fae83fdf89b9d3abcb93cfdcd8f87707e781190bcbd16989F875707de25cd1a	Confirmed	2026-08-31 09:57:47.70232
\.


--
-- TOC entry 5045 (class 0 OID 16551)
-- Dependencies: 224
-- Data for Name: evidence; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.evidence (id, project_id, evidence_type, file_reference, description, created_at, file_name, file_type, file_path) FROM stdin;
1	1	biomass_survey	sundarbans_lidar_report_2026_08.pdf	Biomass density calculation based on LiDAR point clouds and soil carbon cores.	2026-08-31 09:57:45.607669	\N	\N	\N
6	1	mangrove_photo	Evidence.jsx	mangrove restoration project photo	2026-09-01 23:00:17.027103	\N	\N	\N
\.


--
-- TOC entry 5043 (class 0 OID 16531)
-- Dependencies: 222
-- Data for Name: mrv_records; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mrv_records (id, project_id, monitoring_date, carbon_stock, estimated_credits, notes, verification_status, created_at) FROM stdin;
1	1	2026-08-30	14200.50	2840.00	Biomass density checked via drone LiDAR scanning. High soil organic carbon density.	Verified	2026-08-31 09:57:43.407645
\.


--
-- TOC entry 5041 (class 0 OID 16513)
-- Dependencies: 220
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.projects (id, name, location, ecosystem, area, start_date, description, owner, status, created_at) FROM stdin;
1	Sundarbans Blue Carbon Forest	Sundarbans, India/Bangladesh	Mangrove	2500.75	2026-01-15	Sundarbans mangrove preservation and restoration project targeting high-density above ground biomass carbon offset verification.	Sundarbans Eco Development Authority	Active	2026-08-31 09:57:41.276663
4	mangorove	tamil nadu	Mangrove	99.99	2026-09-01	\N	Admin	Active	2026-09-01 09:53:31.41057
5	mangrove	ttamil nadu	Mangrove	100.00	2026-09-01	\N	Admin	Active	2026-09-01 09:59:15.926373
6	mangroves	pichavaram	Mangrove	100.00	2026-09-01	\N	Admin	Active	2026-09-01 11:08:18.373082
7	mangroves	pichavaram	Mangrove	100.00	2026-09-01	\N	Admin	Active	2026-09-01 11:09:04.456577
8	mangroves	pichavaram	Mangrove	100.00	2026-09-01	\N	Admin	Active	2026-09-01 11:16:51.067583
\.


--
-- TOC entry 5057 (class 0 OID 0)
-- Dependencies: 225
-- Name: blockchain_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.blockchain_records_id_seq', 1, true);


--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 223
-- Name: evidence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.evidence_id_seq', 6, true);


--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 221
-- Name: mrv_records_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mrv_records_id_seq', 1, true);


--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 219
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projects_id_seq', 8, true);


--
-- TOC entry 4889 (class 2606 OID 16580)
-- Name: blockchain_records blockchain_records_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blockchain_records
    ADD CONSTRAINT blockchain_records_pkey PRIMARY KEY (id);


--
-- TOC entry 4887 (class 2606 OID 16562)
-- Name: evidence evidence_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evidence
    ADD CONSTRAINT evidence_pkey PRIMARY KEY (id);


--
-- TOC entry 4885 (class 2606 OID 16544)
-- Name: mrv_records mrv_records_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mrv_records
    ADD CONSTRAINT mrv_records_pkey PRIMARY KEY (id);


--
-- TOC entry 4883 (class 2606 OID 16529)
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- TOC entry 4892 (class 2606 OID 16581)
-- Name: blockchain_records blockchain_records_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.blockchain_records
    ADD CONSTRAINT blockchain_records_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- TOC entry 4891 (class 2606 OID 16563)
-- Name: evidence evidence_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.evidence
    ADD CONSTRAINT evidence_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


--
-- TOC entry 4890 (class 2606 OID 16545)
-- Name: mrv_records mrv_records_project_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mrv_records
    ADD CONSTRAINT mrv_records_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id) ON DELETE CASCADE;


-- Completed on 2026-09-02 19:09:14

--
-- PostgreSQL database dump complete
--

\unrestrict 6iSOZgb36u2aZ4P6lZtfZfbTG75dj5J0o2gq47omMCGIjwacZWjYbvyIRgcabM8

