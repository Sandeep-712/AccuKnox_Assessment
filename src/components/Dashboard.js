import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWidget, removeWidget } from '../store/action';
import { Grid, Typography, Button, TextField, Drawer, Tabs, Tab, IconButton, Checkbox, FormControlLabel, Box, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

function Dashboard({ searchItem }) {
    const data = useSelector(state => state.categories);
    const dispatch = useDispatch();

    const [newWidgetName, setNewWidgetName] = useState("");
    const [newWidgetText, setNewWidgetText] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedWidgets, setSelectedWidgets] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        setSelectedWidgets([]); // Clear widget selection when changing tabs
        setSelectedCategoryIndex(newValue); // Update selectedCategoryIndex based on the selected tab
    };

    const handleCheckboxChange = (index) => {
        setSelectedWidgets((prev) => {
            if (prev.includes(index)) {
                return prev.filter((i) => i !== index);
            } else {
                return [...prev, index];
            }
        });
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleAddWidget = (e) => {
        e.preventDefault();

        if (newWidgetName && newWidgetText) {
            const newWidget = { name: newWidgetName, text: newWidgetText };
            dispatch(addWidget(selectedCategoryIndex, newWidget));
            setNewWidgetName("");
            setNewWidgetText("");
            setModalOpen(false);
            setDrawerOpen(false); // Close the drawer after adding the widget
        }
    };

    const handleRemoveWidget = (categoryIndex, widgetIndex) => {
        dispatch(removeWidget(categoryIndex, widgetIndex));
    };

    const handleRemoveSelectedWidgets = () => {
        if (selectedWidgets.length > 0) {
            selectedWidgets.forEach(index => {
                dispatch(removeWidget(selectedTab, index));
            });
            setSelectedWidgets([]);
        }
    };

    const filteredWidgets = (category) => {
        return category.widgets.filter((widget) => {
            return typeof widget.name === 'string' && widget.name.toLowerCase().includes(searchItem.toLowerCase());
        });
    };

    const handleOpenModal = (index) => {
        setSelectedCategoryIndex(index);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const drawerContent = (
        <Box
            role="presentation"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: 'auto',
                maxWidth: '400px', // Adjust as necessary
            }}
        >
            <Box
                sx={{
                    padding: '16px',
                    backgroundColor: '#3f51b5', // New background color
                    color: '#f5f5f5', // New text color
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                }}
            >
                <Typography variant="h6">Add Widget</Typography>
                <IconButton
                    color="inherit"
                    onClick={toggleDrawer(false)}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    aria-label="dashboard tabs"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {data.map((category, index) => (
                        <Tab key={index} label={category.name} />
                    ))}
                </Tabs>
            </Box>
            <Box sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
                <Typography variant="h6">{data[selectedTab].name}</Typography>
                {data[selectedTab].widgets.map((widget, idx) => (
                    <FormControlLabel
                        key={idx}
                        control={
                            <Checkbox
                                checked={selectedWidgets.includes(idx)}
                                onChange={() => handleCheckboxChange(idx)}
                            />
                        }
                        label={widget.name}
                    />
                ))}
            </Box>
            <Box sx={{ p: 2, mt: 'auto' }}>
                <form onSubmit={handleAddWidget}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5">Add a New Widget</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ width: '100%' }} // Adjust width to fit container
                                label="Widget Name"
                                value={newWidgetName}
                                onChange={(e) => setNewWidgetName(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                sx={{ width: '100%' }} // Adjust width to fit container
                                label="Widget Text"
                                value={newWidgetText}
                                onChange={(e) => setNewWidgetText(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                Add Widget
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="button" variant="contained" color="primary" onClick={handleRemoveSelectedWidgets} fullWidth>
                                Remove Selected Widgets
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );

    return (
        <>
            <Grid container spacing={2} sx={{ overflowX: 'hidden', width: '100%', }}>
                <Grid item xs={12} sx={{ mb: 0.05, margin: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ color: 'black' }}>CNAPP Dashboard</Typography>
                    <Button variant="contained" color="secondary" onClick={toggleDrawer(true)}>
                        Add Widget <AddIcon />
                    </Button>
                    <Drawer
                        anchor="right"
                        open={drawerOpen}
                        onClose={toggleDrawer(false)}
                        PaperProps={{
                            style: {
                                width: 'auto', // Adjust as necessary
                                maxWidth: '600px',
                            },
                        }}
                    >
                        {drawerContent}
                    </Drawer>
                </Grid>
                {data.map((category, index) => (
                    <Grid container spacing={2} key={index} sx={{ margin: 0, padding: 0 }} style={{ marginLeft: '2rem' }}>
                        <Grid item xs={12} sx={{ padding: 2 }}>
                            <Typography variant="h5" sx={{ mb: 2, marginLeft: 0, color: 'black' }}>{category.name}</Typography>
                        </Grid>
                        {filteredWidgets(category).map((widget, idx) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={idx} sx={{ p: 2 }}>
                                <Box
                                    sx={{
                                        backgroundColor: '#f0f0f0', // New background color
                                        padding: 2,
                                        height: '180px',
                                        borderRadius: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        border: '1px solid transparent',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                        marginLeft: '2rem',
                                        position: 'relative' // Added for positioning the remove icon
                                    }}
                                >
                                    <IconButton
                                        size="small"
                                        style={{ position: 'absolute', top: '10px', right: '10px' }}
                                        onClick={() => handleRemoveWidget(index, idx)}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                    <Typography variant="h6" color="textPrimary">{widget.name}</Typography> {/* Text color */}
                                    <Typography variant="body1" color="textSecondary">{widget.text}</Typography> {/* Text color */}
                                </Box>
                            </Grid>
                        ))}
                        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ p: 2 }}>
                            <Box
                                sx={{
                                    padding: 2,
                                    height: '180px',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '2px dashed gray',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                    background: 'white',
                                    width: '277px',
                                    marginLeft: '2rem'

                                }}
                                onClick={() => handleOpenModal(index)}
                            >
                                <Typography variant="h6" color="primary">+ Add Widget</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                ))}
            </Grid>

            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: '#ffffff', // New background color
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography variant="h6" gutterBottom>Add New Widget</Typography>
                    <TextField
                        fullWidth
                        label="Widget Name"
                        value={newWidgetName}
                        onChange={(e) => setNewWidgetName(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Widget Text"
                        value={newWidgetText}
                        onChange={(e) => setNewWidgetText(e.target.value)}
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={handleAddWidget}>Add Widget</Button>
                </Box>
            </Modal>
        </>
    );
}

export default Dashboard;
